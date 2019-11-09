import { Client, Session } from 'castv2';
import ConnectionController from '../controllers/connection';
import Sender from './sender';

function randomSenderId(): string {
  return `client-${Math.floor(Math.random() * 10e5)}`;
}

export default class Application extends Sender {
  static APP_ID: string = 'CC1AD845';
  public session?: Session;
  public connection?: ConnectionController;

  public constructor(client: Client, session: Session) {
    super(client, randomSenderId(), session.transportId);
    this.session = session;
    this.connection = this.createController(ConnectionController);

    this.connection.connect();
    const self = this;
    function onDisconnect() {
      self.emit('close');
    }
    function onClose(): void {
      if (self.connection) {
        self.connection.removeListener('disconnect', onDisconnect);
        self.connection.close();
      }
      self.connection = undefined;
      self.session = undefined;
      self.superClose();
    }
    this.connection.on('disconnect', onDisconnect);
    this.once('close', onClose);
  }

  superClose(): void {
    super.close();
  }

  close(): void {
    this.connection && this.connection.disconnect();
    this.emit('close');
  }
}
