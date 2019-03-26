import { Client } from '@amilajack/castv2';
import Controller from './controller';

export default class JsonController extends Controller {
  constructor(
    client: Client,
    sourceId: string,
    destinationId: string,
    namespace: string
  ) {
    super(client, sourceId, destinationId, namespace, 'JSON');
  }
}
