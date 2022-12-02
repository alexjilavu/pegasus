import {inject, injectable} from 'inversify';
import {Contract} from 'ethers';
import {TransactionResponse} from '@ethersproject/providers';
import {ABI, ContractRegistry} from '@umb-network/toolbox';
import {PayableOverrides} from '@ethersproject/contracts';

import Settings from '../types/Settings';
import Blockchain from '../lib/Blockchain';
import {ChainStatus} from '../types/ChainStatus';
import {Validator} from '../types/Validator';

@injectable()
class ChainContract {
  readonly settings!: Settings;
  readonly blockchain!: Blockchain;
  registry!: ContractRegistry;

  constructor(@inject('Settings') settings: Settings, @inject(Blockchain) blockchain: Blockchain) {
    this.settings = settings;
    this.blockchain = blockchain;
  }

  async address(): Promise<string> {
    return this.resolveAddress();
  }

  async resolveStatus(): Promise<[address: string, status: ChainStatus]> {
    const contract = await this.resolveContract();
    return Promise.all([contract.address, contract.getStatus()]);
  }

  resolveValidators(chainStatus: ChainStatus): Validator[] {
    return chainStatus.validators.map((address, i) => {
      return {
        id: address.toLowerCase(),
        location: chainStatus.locations[i],
        power: chainStatus.powers[i],
      };
    });
  }

  async resolveAddress(): Promise<string> {
    return (await this.resolveContract()).address;
  }

  async submit(
    dataTimestamp: number,
    root: string,
    keys: Buffer[],
    values: Buffer[],
    v: number[],
    r: string[],
    s: string[],
    payableOverrides: PayableOverrides,
  ): Promise<TransactionResponse> {
    return (await this.resolveContract())
      .connect(this.blockchain.wallet)
      .submit(dataTimestamp, root, keys, values, v, r, s, payableOverrides);
  }

  resolveContract = async (): Promise<Contract> => {
    if (!this.registry) {
      this.registry = new ContractRegistry(this.blockchain.getProvider(), this.blockchain.getContractRegistryAddress());
    }

    const chainAddress = await this.registry.getAddress(this.settings.blockchain.contracts.chain.name);
    return new Contract(chainAddress, ABI.chainAbi, this.blockchain.getProvider());
  };
}

export default ChainContract;
