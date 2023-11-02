import {inject, injectable} from 'inversify';

import {LoopAgent} from './LoopAgent';
import {UniswapPoolService} from '../services/uniswap/UniswapPoolService';
import Settings from '../types/Settings';

@injectable()
export class UniswapVerificationAgent extends LoopAgent {
  @inject(UniswapPoolService) poolService!: UniswapPoolService;

  readonly uniswapActive: boolean;

  constructor(@inject('Settings') settings: Settings) {
    super();
    this.interval = settings.api.uniswap.verificationInterval;
    this.uniswapActive = !!settings.api.uniswap.helperContractId && !!settings.api.uniswap.scannerContractId;
  }

  async execute(): Promise<void> {
    if (!this.uniswapActive) {
      this.logger.info('[UniswapVerificationAgent] not active');
      return;
    }

    this.logger.info('[UniswapVerificationAgent] Updating Verified Uniswap Pools.');
    await this.poolService.updatePoolVerificationStatus();
  }
}
