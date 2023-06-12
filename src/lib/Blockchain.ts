import {StaticJsonRpcProvider} from '@ethersproject/providers';
import {RPCSelector} from '@umb-network/toolbox';
import {inject, injectable} from 'inversify';
import {ethers, Wallet} from 'ethers';
import {Logger} from 'winston';

import Settings, {BlockchainSettings} from '../types/Settings';
import {RPCSelectionStrategies} from '../types/RPCSelectionStrategies';

export type BlockchainProps = {
  chainId: string;
  settings: Settings;
};

@injectable()
class Blockchain {
  @inject('Logger') logger!: Logger;
  @inject('Settings') settings!: Settings;
  readonly chainId!: string;
  readonly isMasterChain!: boolean;
  chainSettings!: BlockchainSettings;
  provider!: ethers.providers.StaticJsonRpcProvider;
  wallet!: Wallet;
  deviationWallet: Wallet | undefined;
  providersUrls!: string[];
  selectionStrategy!: string;

  constructor(@inject('Settings') settings: Settings, chainId = settings.blockchain.masterChain.chainId) {
    this.chainId = chainId;
    this.isMasterChain = chainId === settings.blockchain.masterChain.chainId;
    this.chainSettings = (<Record<string, BlockchainSettings>>settings.blockchain.multiChains)[chainId];
    this.providersUrls = settings.blockchain.provider.urls;

    if (this.isMasterChain) {
      this.constructProvider();
    } else {
      this.provider = new ethers.providers.StaticJsonRpcProvider(this.chainSettings.providerUrl);
    }

    this.wallet = new Wallet(settings.blockchain.provider.privateKey, this.provider);

    if (settings.blockchain.provider.deviationPrivateKey) {
      this.deviationWallet = new Wallet(settings.blockchain.provider.deviationPrivateKey, this.provider);
    }

    this.selectionStrategy = settings.rpcSelectionStrategy;
  }

  private constructProvider() {
    for (const url of this.providersUrls) {
      try {
        this.provider = new StaticJsonRpcProvider(url);
        break;
      } catch (err) {
        this.logger.info(`[Blockchain] Failed to instantiate ${url}. ${err}.`);
      }
    }

    if (!this.provider) {
      this.provider = new StaticJsonRpcProvider(this.providersUrls[0]);
    }
  }

  async getBlockNumber(): Promise<number> {
    return this.provider.getBlockNumber();
  }

  async networkId(): Promise<number> {
    const network = await this.provider.getNetwork();
    return network.chainId;
  }

  async getBlockTimestamp(): Promise<number> {
    return (await this.provider.getBlock('latest')).timestamp;
  }

  async setLatestProvider(): Promise<void> {
    const rpcSelector = new RPCSelector(this.providersUrls, {timeout: 1500, maxTimestampDiff: 60000});

    const provider =
      this.selectionStrategy === RPCSelectionStrategies.BY_BLOCK_NUMBER
        ? await rpcSelector.selectByLatestBlockNumber()
        : await rpcSelector.selectByTimestamp();

    this.provider = new StaticJsonRpcProvider(provider);
    this.wallet = new Wallet(this.settings.blockchain.provider.privateKey, this.provider);
  }

  getProvider(): StaticJsonRpcProvider {
    return this.provider;
  }

  getContractRegistryAddress(): string {
    if (!this.chainSettings.contractRegistryAddress) {
      throw new Error(`[${this.chainId}] No contract registry address set`);
    }

    return this.chainSettings.contractRegistryAddress;
  }
}

export default Blockchain;
