import { Client } from 'castv2';
import ConnectionController from '../controllers/connection';
import Sender from './sender';

function randomSenderId(): string {
  return `client-${Math.floor(Math.random() * 10e5)}`;
}

export default class Application extends Sender {
  static APP_ID: string = 'CC1AD845';

  connection: ConnectionController | undefined;

  public constructor(client: Client, session) {
    super(client, randomSenderId(), session.transportId);
    this.session = session;
    this.connection = this.createController(ConnectionController);

    if (this.connection) {
      this.connection.connect();
    }

    const onDisconnect = () => {
      this.emit('close');
    }
    const onClose = () => {
      if (this.connection) {
        this.connection.removeListener('disconnect', onDisconnect);
        this.connection.close();
        this.connection = undefined;
        this.session = undefined;
        this.superClose();
      }
    }
    if (this.connection) {
      this.connection.on('disconnect', onDisconnect);
      this.once('close', onClose);
    }
  }

  superClose(): void {
    super.close();
  }

  close(): void {
    if (this.connection) {
      this.connection.disconnect();
      this.emit('close');
    }
  }
}
