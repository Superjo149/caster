import { Client } from 'castv2';
import RequestResponseController from './request-response';
export default class MediaController extends RequestResponseController {
    private currentSession;
    constructor(client: Client, sourceId: string, destinationId: string);
    getStatus(): Promise<string>;
    load(media: any, options?: {}): Promise<unknown>;
    sessionRequest(data: {
        type: string;
        [key: string]: any;
    }): Promise<unknown>;
    play(): Promise<unknown>;
    pause(): Promise<unknown>;
    stop(): Promise<unknown>;
    seek(currentTime: number): Promise<unknown>;
    queueLoad(items: Object[], options?: Object): Promise<unknown>;
    queueInsert(items: Object[], options: Object): Promise<unknown>;
    queueRemove(itemIds: string[], options: Object): Promise<unknown>;
    queueReorder(itemIds: string[], options: Object): Promise<unknown>;
    queueUpdate(items: Object[], options: Object): Promise<unknown>;
}
