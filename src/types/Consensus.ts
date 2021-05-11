import Leaf from '../models/Leaf';
import {BigNumber} from 'ethers';

export interface DataForConsensus {
  affidavit: string;
  blockHeight: number;
  dataTimestamp: number;
  numericFcdKeys: string[];
  numericFcdValues: number[];
  leaves: Leaf[];
  root: string;
}

export interface Consensus {
  dataTimestamp: number;
  leaves: Leaf[];
  blockHeight: number;
  root: string;
  numericFcdKeys: string[];
  numericFcdValues: number[];
  signatures: string[];
  power: BigNumber;
}