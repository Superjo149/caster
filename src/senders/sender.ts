import { Client } from 'castv2';
import { EventEmitter } from 'events';

export default class Sender extends EventEmitter {
  client?: Client;
  senderId?: string;
  receiverId?: string;

  constructor(client: Client, senderId: string, receiverId: string) {
    super();
    this.client = client;
    this.senderId = senderId;
    this.receiverId = receiverId;
  }

  /**
   * Close the Sender
   */
  close() {
    this.senderId = undefined;
    this.receiverId = undefined;
    this.client = undefined;
  }

  /**
   * Create a controller using the Sender's properties
   * @param {Controller} controller
   * @param {*} args
   */
  createController<T extends any>(Controller: { new(...args: any[]): T; }, ...args: any[]): T {
    if (!this.client || !this.senderId || !this.receiverId) {
      throw new Error("Client may be closed")
    }

    return new Controller(this.client, this.senderId, this.receiverId, ...args);
  }
}
