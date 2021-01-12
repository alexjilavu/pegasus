import { inject, injectable } from 'inversify';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import compression from 'compression';
import logger from './logger';
import Settings from '../types/Settings';
import HealthController from '../controllers/HealthController';
import BlocksController from '../controllers/BlocksController';

@injectable()
class Server {
  private port: number;
  private router: express.Application;
  private server: http.Server;

  constructor(
    @inject('Settings') settings: Settings,
    @inject(HealthController) healthController: HealthController,
    @inject(BlocksController) blocksController: BlocksController
  ) {
    this.port = settings.port;

    this.router = express()
      .use(helmet())
      .use(compression())
      .use(express.json())
      .use(express.urlencoded({ extended: true }))
      .use('/blocks', blocksController.router)
      .use('/health', healthController.router);

    this.server = http.createServer(this.router);
  }

  start(): void {
    this.server.listen(this.port, () => logger.info('Live on: ' + this.port));
  }
}

export default Server;