import { Client, Session } from 'castv2';
import ConnectionController from '../controllers/connection';
import Sender from './sender';
export default class Application extends Sender {
    static APP_ID: string;
    session?: Session;
    connection?: ConnectionController;
    constructor(client: Client, session: Session);
    superClose(): void;
    close(): void;
}
