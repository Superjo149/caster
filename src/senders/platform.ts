import { Client, ConnectOptions, Session } from 'castv2';
import Sender from './sender';
import ConnectionController from '../controllers/connection';
import HeartbeatController from '../controllers/heartbeat';
import ReceiverController from '../controllers/receiver';
import { Application } from '..';

export default class PlatformSender extends Sender {
  connection?: ConnectionController;
  heartbeat?: HeartbeatController;
  receiver?: ReceiverController;

  constructor() {
    super(new Client(), 'sender-0', 'receiver-0');
  }

  /**
   * Connect
   */
  connect(options: ConnectOptions) {
    const self = this;
    return new Promise(resolve => {

      if (!this.client) {
        return;
      }

      this.client.on('error', err => {
        this.emit('error', err);
      });

      this.client.connect(options, () => {
        this.connection = this.createController(ConnectionController);
        this.heartbeat = this.createController(HeartbeatController);
        this.receiver = this.createController(ReceiverController);

        function onStatus(status: string) {
          self.emit('status', status);
        }

        this.receiver.on('status', onStatus);

        if (!this.client) {
          return;
        }

        this.client.once('close', () => {
          this.heartbeat && this.heartbeat.stop();
          this.receiver && this.receiver.removeListener('status', onStatus);
          this.receiver && this.receiver.close();
          this.heartbeat && this.heartbeat.close();
          this.connection && this.connection.close();
          this.receiver = undefined;
          this.heartbeat = undefined;
          this.connection = undefined;
          super.close();
        });

        this.heartbeat.once('timeout', () => {
          this.emit('error', new Error('Device timeout'));
        });

        this.connection.connect();
        this.heartbeat.start();

        resolve();
      });
    });
  }

  /**
   * Close
   */
  close() {
    this.client && this.client.close();
  }

  /**
   * Get the status
   */
  getStatus() {
    if (!this.receiver) {
      throw new Error("Connection has been closed");
    }
    return this.receiver.getStatus();
  }

  /**
   * Get the sessions
   */
  getSessions() {
    if (!this.receiver) {
      throw new Error("Connection has been closed");
    }
    return this.receiver.getSessions();
  }

  /**
   * Get app availability
   */
  getAppAvailability(appId: string) {

    return new Promise((resolve, reject) => {
      if (!this.receiver) {
        throw new Error("Connection has been closed");
      }

      this.receiver
        .getAppAvailability(appId)
        .then((availability: any) => {
          for (const key in availability) {
            availability[key] = availability[key] === 'APP_AVAILABLE';
          }
          resolve(availability);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Join
   */
  join<T extends any>(session: Session, application: T): Promise<T> {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (!this.client) {
          return reject(new Error("Connection has been closed"));
        }

        resolve(new application(this.client, session));
      });
    });
  }

  /**
   * Launch an application
   * @param {Application} application - Application
   * @returns {Promise}
   */
  launch<T extends any>(application: any): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.receiver) {
        return reject(new Error("Connection has been closed"));
      }
      
      this.receiver
        .launch(application.APP_ID)
        .then((sessions: Session[]) => {
          const filtered = sessions.filter(
            session => session.appId === application.APP_ID
          );

          const session = filtered.shift();

          if (!session) {
            return reject(new Error("Invalid session"));
          }

          return this.join<T>(session, application)
            .then(response => resolve(response))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Close an application and stop it
   */
  stop(application: Application): Promise<any> {
    if (!this.receiver) {
      throw new Error("Connection has been closed");
    }
    const { session } = application;
    application.close();

    if (!session) {
      return Promise.resolve();
    }

    return this.receiver.stop(session.sessionId);
  }

  /**
   * Set the volume
   */
  setVolume(volume: Object) {
    if (!this.receiver) {
      throw new Error('No receiver');
    }
    return this.receiver.setVolume(volume);
  }

  /**
   * Get the volume
   */
  getVolume() {
    if (!this.receiver) {
      throw new Error('No receiver');
    }
    return this.receiver.getVolume();
  }
}
