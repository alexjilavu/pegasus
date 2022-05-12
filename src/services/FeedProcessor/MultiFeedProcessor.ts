import {inject, injectable} from 'inversify';
import {Logger} from 'winston';

import {FeedFetcher} from '../../types/Feed';
import {mergeArrays} from '../../utils/collections';
import CoingeckoMultiProcessor from './CoingeckoMultiProcessor';
import CryptoCompareMultiProcessor from './CryptoCompareMultiProcessor';

@injectable()
export default class MultiFeedProcessor {
  @inject('Logger') logger!: Logger;
  @inject(CoingeckoMultiProcessor) coingeckoMultiProcessor!: CoingeckoMultiProcessor;
  @inject(CryptoCompareMultiProcessor) cryptoCompareMultiProcessor!: CryptoCompareMultiProcessor;

  async apply(feedFetchers: FeedFetcher[]): Promise<unknown[]> {
    if (!feedFetchers.length) return [];

    let response: unknown[] = [];
    response.length = feedFetchers.length;

    const promisesResults = await Promise.allSettled([
      this.cryptoCompareMultiProcessor.apply(feedFetchers),
      this.coingeckoMultiProcessor.apply(feedFetchers),
    ]);

    promisesResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        response = mergeArrays(response, result.value);
      } else {
        this.logger.warn(`[MultiFeedProcessor] Ignored multi price processor. Reason: ${result.reason}`);
      }
    });

    return response;
  }
}