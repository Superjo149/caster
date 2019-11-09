import { Client } from 'castv2';
import Application from './application';
export default class DefaultMediaReceiver extends Application {
    static APP_ID: string;
    APP_ID: string;
    private media;
    constructor(client: Client, session: any);
    getStatus(): Promise<string>;
    load(media: any, options?: {}): Promise<unknown>;
    play(): Promise<unknown>;
    pause(): Promise<unknown>;
    stop(): Promise<unknown>;
    seek(currentTime: number): Promise<unknown>;
    queueLoad(items: any[], options?: {}): Promise<unknown>;
    queueInsert(items: any[], options?: {}): Promise<unknown>;
    queueRemove(itemIds: string[], options?: {}): Promise<unknown>;
    queueReorder(itemIds: string[], options?: {}): Promise<unknown>;
    queueUpdate(items: any[], options?: {}): Promise<unknown>;
}
