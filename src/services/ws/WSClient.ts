import {inject, injectable} from 'inversify';
import {w3cwebsocket as WebSocket} from 'websocket';
import {Logger} from 'winston';

@injectable()
abstract class WSClient {
  @inject('Logger') logger!: Logger;

  started = false;
  open = false
  url: string;
  reconnectTimout: number;
  symbols: Set<string> = new Set<string>();

  socket?: WebSocket;

  protected constructor(url: string, reconnectTimout= 5000) {
    this.url = url;
    this.reconnectTimout = reconnectTimout;
  }

  protected onStart(): void {
    this.logger.info('started');
  }

  protected onOpen(): void {
    this.logger.info('opened');
  }

  protected onClose(): void {
    this.logger.info('closed');

    this.socket = undefined;
    this.symbols.clear();

    setTimeout(() => {
      if (this.started) {
        this.connect();
      }
    }, this.reconnectTimout);
  }

  protected onMessage(message: string): void {
    this.logger.warn(`message received: ${message}`);
  }

  start(): void {
    if (this.started) {
      return;
    }

    this.started = true;

    this.onStart();

    this.connect();
  }

  connect(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
      this.open = true;
      this.onOpen();
    };

    this.socket.onmessage = (event) => {
      this.onMessage(event.data as string);
    };

    this.socket.onclose = (event) => {
      if (event.wasClean) {
        console.warn(`Connection closed cleanly, code=${event.code} reason=${event.reason}`);
      } else {
        // e.g. server process killed or network down
        // event.code is usually 1006 in this case
        console.warn('Connection died');
      }

      this.open = false;
      this.onClose();
    };
  }

  stop() {
    this.started = false;

    this.socket?.close();
  }
}

export default WSClient;