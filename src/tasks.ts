import {boot} from './boot';
import yargs from 'yargs';
import {EventEmitter} from 'events';
import {getModelForClass} from '@typegoose/typegoose';
import {GasEstimator} from '@umb-network/toolbox';

import Application from './lib/Application';
import FeedProcessor from './services/FeedProcessor';
import loadFeeds from './services/loadFeeds';
import Settings from './types/Settings';
import Block from './models/Block';
import PolygonIOPriceInitializer from './services/PolygonIOPriceInitializer';
import CryptoCompareWSInitializer from './services/CryptoCompareWSInitializer';
import TimeService from './services/TimeService';
import Blockchain from './lib/Blockchain';

const argv = yargs(process.argv.slice(2)).options({
  task: {type: 'string', demandOption: true},
}).argv;

async function testFeeds(settings: Settings): Promise<void> {
  await Application.get(PolygonIOPriceInitializer).apply();
  await Application.get(CryptoCompareWSInitializer).apply();

  const feeds = await loadFeeds(settings.feedsFile);

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const leaves = await Application.get(FeedProcessor).apply(new TimeService().apply(), feeds);
  console.log('Feeds: ', leaves);
}

async function dbCleanUp(): Promise<void> {
  const blockModel = getModelForClass(Block);
  await blockModel.collection.deleteMany({});
}

async function estimateGasPrice(settings: Settings): Promise<void> {
  const blockchain = Application.get(Blockchain);
  const {minGasPrice, maxGasPrice} = settings.blockchain.transactions;
  await GasEstimator.apply(blockchain.provider.getRawProvider(), minGasPrice, maxGasPrice);
}

const ev = new EventEmitter();
ev.on('done', () => process.exit());

(async () => {
  await boot();
  const settings: Settings = Application.get('Settings');

  switch (argv.task) {
    case 'db:cleanup': {
      await dbCleanUp();
      ev.emit('done');
      break;
    }
    case 'test:feeds': {
      await testFeeds(settings);
      ev.emit('done');
      break;
    }

    case 'estimate:gas-price': {
      await estimateGasPrice(settings);
      ev.emit('done');
      break;
    }
  }
})();
