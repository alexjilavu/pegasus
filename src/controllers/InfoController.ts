import {inject, injectable} from 'inversify';
import express, {Request, Response} from 'express';

import Settings from '../types/Settings';
import ChainContract from '../contracts/ChainContract';
import Blockchain from '../lib/Blockchain';

@injectable()
class InfoController {
  router: express.Router;
  blockchain!: Blockchain;

  constructor(
    @inject('Settings') private readonly settings: Settings,
    @inject(ChainContract) private readonly chainContract: ChainContract,
    @inject(Blockchain) blockchain: Blockchain,
  ) {
    this.router = express.Router().get('/', this.info);
    this.blockchain = blockchain;
  }

  info = async (request: Request, response: Response): Promise<void> => {
    let validatorAddress, chainContractAddress, network;

    try {
      validatorAddress = await this.blockchain.wallet.getAddress();
    } catch (e) {
      validatorAddress = e;
    }

    try {
      chainContractAddress = await this.chainContract.resolveAddress();
    } catch (e) {
      chainContractAddress = e;
    }

    try {
      network = await this.blockchain.provider.getNetwork();
    } catch (e) {
      network = e;
    }

    response.send({
      validator: validatorAddress,
      contractRegistryAddress: this.settings.blockchain.contracts.registry.address,
      chainContractAddress: chainContractAddress,
      version: this.settings.version,
      environment: this.settings.environment,
      network,
      name: this.settings.name,
    });
  };
}

export default InfoController;
