import { Client } from 'castv2';
import RequestResponseController from './request-response';

export default class ReceiverController extends RequestResponseController {
  constructor(client: Client, sourceId: string, destinationId: string) {
    super(
      client,
      sourceId,
      destinationId,
      'urn:x-cast:com.google.cast.receiver'
    );
    const self = this;
    function onMessage(
      data: { type: string; status: string },
      broadcast: undefined | Object
    ) {
      if (!broadcast) return;
      if (data.type === 'RECEIVER_STATUS') self.emit('status', data.status);
    }

    function onClose() {
      self.removeListener('message', onMessage);
    }

    this.on('message', onMessage);
    this.once('close', onClose);
  }

  /**
   * Get the status
   */
  async getStatus(): Promise<any> {
    const response = await this.request({
      type: 'GET_STATUS'
    });

    return response.status;
  }

  /**
   * Get app availability
   */
  async getAppAvailability(appId: string | Array<string>): Promise<string> {
    const response = await this.request({
      type: 'GET_APP_AVAILABILITY',
      appId: Array.isArray(appId) ? appId : [appId]
    });

    return response.availability;
  }

  /**
   * Launch an App with its ID
   */
  async launch(appId: string) {
    const response = await this.request({
      type: 'LAUNCH',
      appId
    });

    if (response.type === 'LAUNCH_ERROR')
      throw new Error(`Launch failed. Reason: ${response.reason}`)

    return response.status.applications || [];
  }

  /**
   * Stop a session with its ID
   */
  async stop(sessionId: string) {
    const response = await this.request({
      type: 'STOP',
      sessionId
    });

    return response.status.applications || [];
  }

  /**
   * Set the volume
   */
  async setVolume(options: Object) {
    const response = await this.request({
      type: 'SET_VOLUME',
      volume: options
    });

    return response.status.volume || [];
  }

  /**
   * Get the volume
   */
  async getVolume(): Promise<string> {
    const status = await this.getStatus();

    return status.volume;
  }

  /**
   * Get the sessions
   */
  async getSessions(): Promise<string[]> {
    const status = await this.getStatus();

    return status.applications || [];
  }
}
