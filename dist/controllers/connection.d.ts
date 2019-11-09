import { Client } from 'castv2';
import JsonController from './json';
export default class ConnectionController extends JsonController {
    constructor(client: Client, sourceId: string, destinationId: string);
    connect(): void;
    disconnect(): void;
}
