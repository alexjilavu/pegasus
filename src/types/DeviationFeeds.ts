import {Feed} from './Feed';
import Leaf from '../types/Leaf';
import {ChainsIds} from './ChainsIds';
import {KeyValues} from './SignedBlock';
import {Discrepancy} from './Discrepancy';
import {DataCollection} from './custom';

export interface DeviationFeed extends Feed {
  // deviation feed attributes
  heartbeat: number;
  trigger: number;
  interval: number;
  chains: ChainsIds[];
}

export interface DeviationFeeds {
  [leafLabel: string]: DeviationFeed;
}

export interface DeviationLeavesAndFeeds {
  feeds: DeviationFeeds;
  leaves: Leaf[];
}

export interface Signature {
  v: number;
  r: string;
  s: string;
}

export interface PriceData {
  data: number;
  heartbeat: number;
  timestamp: number;
  price: bigint;
}

export interface PriceDataWithKey extends PriceData {
  key: string;
}

export type PriceDataByKey = DataCollection<PriceDataWithKey>;

export type PriceDataPerChain = DataCollection<PriceDataByKey>;

export type KeysPerChain = Record<string, string[]>;

export type DeviationSignatures = Record<string, string>; // chainId => signature

export type DeviationDataToSign = {
  dataTimestamp: number;
  leaves: KeyValues; // key/label => value
  feedsForChain: DataCollection<string[]>;
  proposedPriceData: DataCollection<PriceData>; // key => priceData
};

export interface DeviationSignerResponse {
  error?: string;
  signatures?: DeviationSignatures;
  discrepancies: Discrepancy[];
  version: string;
}

export type UmbrellaFeedsUpdateArgs = {
  keys: string[];
  priceDatas: PriceData[];
  signatures: Signature[];
};

export type OnChainMetadataType = [chainId: ChainsIds, networkId: number, contractAddress: string];

export interface FilterResult {
  result: boolean;
  msg?: string;
}

export interface FilterResultWithKey extends FilterResult {
  key: string;
}