/// <reference types="node" />
import { Client } from 'castv2';
import { EventEmitter } from 'events';
export default class Controller extends EventEmitter {
    private channel;
    constructor(client: Client, sourceId: string, destinationId: string, namespace?: string, encoding?: string);
    send(data: Record<string, string>): void;
    close(): void;
}
