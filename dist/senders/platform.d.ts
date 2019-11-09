import { ConnectOptions, Session } from 'castv2';
import Sender from './sender';
import ConnectionController from '../controllers/connection';
import HeartbeatController from '../controllers/heartbeat';
import ReceiverController from '../controllers/receiver';
import { Application } from '..';
export default class PlatformSender extends Sender {
    connection?: ConnectionController;
    heartbeat?: HeartbeatController;
    receiver?: ReceiverController;
    constructor();
    connect(options: ConnectOptions): Promise<unknown>;
    close(): void;
    getStatus(): Promise<any>;
    getSessions(): Promise<string[]>;
    getAppAvailability(appId: string): Promise<unknown>;
    join<T extends any>(session: Session, Application: T): Promise<T>;
    launch<T extends any>(application: any): Promise<T>;
    stop(application: Application): Promise<any>;
    setVolume(volume: Object): Promise<any>;
    getVolume(): Promise<string>;
}
