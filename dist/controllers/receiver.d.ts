import { Client } from 'castv2';
import RequestResponseController from './request-response';
export default class ReceiverController extends RequestResponseController {
    constructor(client: Client, sourceId: string, destinationId: string);
    getStatus(): Promise<any>;
    getAppAvailability(appId: string | Array<string>): Promise<string>;
    launch(appId: string): Promise<any>;
    stop(sessionId: string): Promise<any>;
    setVolume(options: Object): Promise<any>;
    getVolume(): Promise<string>;
    getSessions(): Promise<string[]>;
}
