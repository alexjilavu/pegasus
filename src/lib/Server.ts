import {inject, injectable} from 'inversify';
import express from 'express';
import http from 'http';
import {Logger} from 'winston';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

import logger from './logger';
import Settings from '../types/Settings';
import HealthController from '../controllers/HealthController';
import BlocksController from '../controllers/BlocksController';
import SignatureController from '../controllers/SignatureController';
import InfoController from '../controllers/InfoController';
import DebugController from '../controllers/DebugController';
import DocsController from '../controllers/DocsController';

@injectable()
class Server {
  private port: number;
  private router: express.Application;
  private server: http.Server;
  private logger: Logger;

  constructor(
    @inject('Logger') logger: Logger,
    @inject('Settings') settings: Settings,
    @inject(HealthController) healthController: HealthController,
    @inject(DebugController) debugController: DebugController,
    @inject(BlocksController) blocksController: BlocksController,
    @inject(SignatureController) signatureController: SignatureController,
    @inject(InfoController) infoController: InfoController,
    @inject(DocsController) docsController: DocsController,
  ) {
    this.port = settings.port;
    this.logger = logger;

    this.router = express()
      .use(helmet())
      .use(compression())
      .use(express.json({limit: '8mb'}))
      .use(express.urlencoded({extended: true}))
      .use(cors())
      .use('/blocks', blocksController.router)
      .use('/debug', debugController.router)
      .use('/health', healthController.router)
      .use('/signature', signatureController.router)
      .use('/info', infoController.router)
      .use('/docs', docsController.router);

    this.server = http.createServer(this.router);
  }

  start(): void {
    this.server.listen(this.port, () => logger.info(`Validator is live on ${this.port}`));
  }
}

export default Server;
