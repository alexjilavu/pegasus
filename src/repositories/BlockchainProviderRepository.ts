import {BlockchainProviderFactory} from '../factories/BlockchainProviderFactory';
import {inject, injectable} from 'inversify';
import {Provider} from '@ethersproject/providers';
import Settings from '../types/Settings';
import {sample} from 'lodash';

@injectable()
export class BlockchainProviderRepository {
  @inject('Settings') settings!: Settings;
  @inject(BlockchainProviderFactory) providerFactory!: BlockchainProviderFactory;

  get(id: string): Provider | undefined {
    const providerSettings = this.settings.blockchains[id];
    if (!providerSettings) return;

    const url = <string>sample(providerSettings.providerUrl);
    return this.providerFactory.getRpcProvider(url);
  }
}