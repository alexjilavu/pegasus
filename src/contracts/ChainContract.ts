import { inject, injectable } from 'inversify';
import { Contract, BigNumber } from 'ethers';
import { TransactionResponse } from '@ethersproject/providers';
import { ContractRegistry, ABI } from '@umb-network/toolbox';
import Settings from '../types/Settings';
import Blockchain from '../lib/Blockchain';

@injectable()
class ChainContract {
  contract!: Contract;
  gasPrice!: number;

  constructor(
    @inject('Settings') settings: Settings,
    @inject(Blockchain) blockchain: Blockchain
  ) {
    this.gasPrice = settings.blockchain.transactions.gasPrice;

    new ContractRegistry(blockchain.provider, settings.blockchain.contracts.registry.address)
      .getAddress(settings.blockchain.contracts.chain.name)
      .then((chainAddress: string) => {
        this.contract = new Contract(
          chainAddress,
          ABI.chainAbi,
          blockchain.provider
        ).connect(blockchain.wallet);
      })
  }

  getLeaderAddress = async (): Promise<string> => this.contract.getLeaderAddress();
  getBlockHeight = async (): Promise<BigNumber> => this.contract.getBlockHeight();
  getBlockVotersCount = async (blockHeight: BigNumber): Promise<BigNumber> => this.contract.getBlockVotersCount(blockHeight);

  submit = async (root: string, keys: string[], values: string[], v: number[], r: string[], s: string[]): Promise<TransactionResponse> => this
    .contract
    .submit(root, keys, values, v, r, s, {gasPrice: this.gasPrice});
}

export default ChainContract;