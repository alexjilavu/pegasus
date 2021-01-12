import {inject, injectable} from 'inversify';
import Settings from '../types/Settings';
import {KeyValues, SignedBlock} from '../types/SignedBlock';
import Blockchain from '../lib/Blockchain';
import ChainContract from '../contracts/ChainContract';
import SortedMerkleTreeFactory from './SortedMerkleTreeFactory';
import Leaf from '../models/Leaf';
import {BigNumber} from 'ethers';
import loadFeeds from '../config/loadFeeds';
import FeedProcessor from './FeedProcessor';
import Feeds from '../types/Feed';
import {Logger} from 'winston';
import BlockMinter from './BlockMinter';

@injectable()
class BlockSigner {
  @inject('Logger') logger!: Logger;
  @inject('Settings') settings!: Settings;
  @inject(Blockchain) blockchain!: Blockchain;
  @inject(ChainContract) chainContract!: ChainContract;
  @inject(FeedProcessor) feedProcessor!: FeedProcessor;
  @inject(SortedMerkleTreeFactory) sortedMerkleTreeFactory!: SortedMerkleTreeFactory;

  async apply(block: SignedBlock): Promise<string> {
    const currentLeader = await this.chainContract.getLeaderAddress();
    if (currentLeader === this.blockchain.wallet.address) {
      throw Error('You are the leader, and you should not sign your block again.');
    }

    const blockHeight = await this.chainContract.getBlockHeight();

    if (block.blockHeight !== blockHeight.toNumber()) {
      throw Error(`Does not match with the current block ${blockHeight}.`);
    }

    const keyValuesToLeaves = (keyValues: KeyValues) => Object.entries(keyValues).map(([label, value]) => {
      const leaf = new Leaf();
      leaf.value = value;
      leaf.label = label;
      return leaf;
    });

    const proposedLeaves = keyValuesToLeaves(block.leaves);
    const proposedTree = this.sortedMerkleTreeFactory.apply(BlockMinter.sortLeaves(proposedLeaves));

    const proposedFcd = BlockMinter.sortLeaves(keyValuesToLeaves(block.fcd));
    const [proposedFcdKeys, proposedFcdValues] = [
      proposedFcd.map(({label}) => label),
      proposedFcd.map(({value}) => value)
    ];

    const affidavit = BlockMinter.generateAffidavit(proposedTree.getRoot(), BigNumber.from(block.blockHeight), proposedFcdKeys, proposedFcdValues);
    const recoveredSigner = await BlockMinter.recoverSigner(affidavit, block.signature);
    if (recoveredSigner !== currentLeader) {
      throw Error('Signature does not belong to the current leader');
    }

    await Promise.all([
      this.checkFeeds(this.settings.feedsOnChain, proposedFcd),
      this.checkFeeds(this.settings.feedsFile, proposedLeaves)
    ]);

    return await BlockMinter.signAffidavitWithWallet(this.blockchain.wallet, affidavit);
  }

  private async checkFeeds(feedFileName: string, proposedLeaves: Leaf[]): Promise<void> {
    const feeds = await loadFeeds(feedFileName);
    const leaves = await this.feedProcessor.apply(feeds);

    if (!leaves.length) {
      throw Error(`we can't get leaves from ${feedFileName}... check API access to feeds.`);
    }

    if (!this.isValueDeviate(leaves, proposedLeaves, feeds)) {
      throw Error(`Discrepancy is to high.`);
    }
  }

  private isValueDeviate(originalLeafs: Leaf[], leafs: Leaf[], feeds: Feeds) {
    const leafByLabel: {[label: string]: Leaf} = {};
    leafs.forEach((leaf) => {
      leafByLabel[leaf.label] = leaf;
    });

    return originalLeafs.every(({value: originalValue, label}) => {
      const leaf = leafByLabel[label];
      if (!leaf) {
        return false;
      }

      const {value} = leaf;
      const discrepancy = feeds[leaf.label].discrepancy;
      const diffPerc = Math.max(value, originalValue) / Math.min(value, originalValue) - 1.0;
      const invalid = diffPerc < (discrepancy * 0.01);

      this.logger.debug(`${leaf}: requested = ${originalValue}, original = ${value}`);

      return invalid;
    });
  }
}

export default BlockSigner;
