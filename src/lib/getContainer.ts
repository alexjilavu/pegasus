import {Container} from 'inversify';
import Settings from '../types/Settings.js';
import settings from '../config/settings.js';
import {Logger} from 'winston';
import logger from './logger.js';
import CryptoCompareWSClient from '../services/ws/CryptoCompareWSClient.js';
import PriceRepository from '../repositories/PriceRepository.js';
import {FeedFetcherRepository} from '../repositories/FeedFetcherRepository.js';
import {CalculatorRepository} from '../repositories/CalculatorRepository.js';
import {FeedRepository} from '../repositories/FeedRepository.js';
import {UniswapPoolService} from '../services/uniswap/UniswapPoolService.js';
import {BlockchainProviderRepository} from '../repositories/BlockchainProviderRepository.js';
import {Redis} from 'ioredis';
import {initRedis} from '../config/initRedis.js';
import {MongoDBPriceRepository} from '../repositories/MongoDBPriceRepository.js';

export function getContainer(): Container {
  const container = new Container({autoBindInjectable: true});
  container.bind<Settings>('Settings').toConstantValue(settings);
  container.bind<Logger>('Logger').toConstantValue(logger);
  container.bind<CryptoCompareWSClient>(CryptoCompareWSClient).toSelf().inSingletonScope();
  container.bind(PriceRepository).toSelf().inSingletonScope();
  container.bind(FeedFetcherRepository).toSelf().inSingletonScope();
  container.bind(CalculatorRepository).toSelf().inSingletonScope();
  container.bind(FeedRepository).toSelf().inSingletonScope();
  container.bind(UniswapPoolService).toSelf().inSingletonScope();
  container.bind(BlockchainProviderRepository).toSelf().inSingletonScope();
  container.bind(MongoDBPriceRepository).toSelf().inSingletonScope();

  container
    .bind<Redis>('Redis')
    .toDynamicValue((ctx) => initRedis(ctx.container.get('Settings')))
    .inSingletonScope();

  return container;
}
