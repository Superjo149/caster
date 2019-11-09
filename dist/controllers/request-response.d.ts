import { Client } from 'castv2';
import JsonController from './json';
declare type Response = any;
export default class RequestResponseController extends JsonController {
    lastRequestId: number;
    constructor(client: Client, sourceId: string, destinationId: string, namespace: string);
    request(data: Record<string, any>): Promise<Response>;
}
export {};
