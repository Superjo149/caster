/// <reference types="node" />
import { Client } from 'castv2';
import { EventEmitter } from 'events';
export default class Sender extends EventEmitter {
    client?: Client;
    senderId?: string;
    receiverId?: string;
    constructor(client: Client, senderId: string, receiverId: string);
    close(): void;
    createController<T extends any>(Controller: {
        new (...args: any[]): T;
    }, ...args: any[]): T;
}
