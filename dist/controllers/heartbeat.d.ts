import { Client } from 'castv2';
import JsonController from './json';
export default class HeartbeatController extends JsonController {
    private intervalValue;
    private pingTimer;
    private timeout;
    constructor(client: Client, sourceId: string, destinationId: string);
    ping(): void;
    start(intervalValue?: number): void;
    stop(): void;
}
