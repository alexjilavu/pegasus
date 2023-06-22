import {injectable} from 'inversify';
import {PayableOverrides} from "@ethersproject/contracts";
import {GasEstimator} from "@umb-network/toolbox";

import {ChainsIds} from '../../../types/ChainsIds';
import {DeviationDispatcher} from "../DeviationDispatcher";
import {GasEstimation} from "@umb-network/toolbox/dist/types/GasEstimation";


@injectable()
export class LineaDeviationDispatcher extends DeviationDispatcher {
  readonly chainId = ChainsIds.LINEA;

  protected getTxTimeout(): number {
    return 100_000;
  }

  protected async calculatePayableOverrides(props?: {nonce?: number, data?: unknown}): Promise<PayableOverrides> {
    const gasMetrics = await this.resolveGasMetrics();
    if (!gasMetrics || !gasMetrics.maxPriorityFeePerGas || !gasMetrics.maxFeePerGas) return {};

    const nonce = props?.nonce;
    const gasMultiplier = this.blockchain.chainSettings.transactions.gasMultiplier;

    const txCount = await this.blockchainRepository.get(this.chainId).deviationWallet?.getTransactionCount('latest');

    this.logger.info(`[linea] txCount: ${txCount}, gasMultiplier ${gasMultiplier}`
      + ` gasMetrics: ${GasEstimator.printable(gasMetrics)}`);

    const maxPriorityFeePerGas = gasMetrics.maxPriorityFeePerGas * gasMultiplier;
    const maxFeePerGas = this.calcMaxFeePerGas(gasMetrics.maxFeePerGas, maxPriorityFeePerGas);

    return {
      maxPriorityFeePerGas: Math.trunc(maxPriorityFeePerGas),
      maxFeePerGas: Math.min(maxFeePerGas, gasMetrics.max),
      gasLimit: 100_000,
      nonce
    }
  }

  // Doubling the Base Fee when calculating the Max Fee ensures that your transaction
  // will remain marketable for six consecutive 100% full blocks.
  protected calcMaxFeePerGas(baseFee: number, maxPriorityFee = 0): number {
    return 2 * baseFee + maxPriorityFee;
  }
}
