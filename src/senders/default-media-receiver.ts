import { Client } from 'castv2';
import Application from './application';
import MediaController from '../controllers/media';

export default class DefaultMediaReceiver extends Application {
  static APP_ID: string = 'CC1AD845';

  APP_ID: string = 'CC1AD845';
  private media: MediaController | undefined;

  constructor(client: Client, session: any) {
    super(client, session);

    /**
     * Media controller
     * @type {MediaController}
     */
    this.media = this.createController(MediaController);
    const self = this;
    function onDisconnect() {
      self.emit('close');
    }
    function onStatus(status: string) {
      self.emit('status', status);
    }
    function onClose() {
      if (!self.media) {
        return;
      }
      self.media.removeListener('disconnect', onDisconnect);
      self.media.removeListener('status', onStatus);
      self.media.close();
      self.media = undefined;
    }

    if (!this.media) {
      throw new Error("no media");
    }

    this.media.on('status', onStatus);
    this.once('close', onClose);
    this.media.on('disconnect', onDisconnect);
  }

  /**
   * Get the status
   * @returns {Promise}
   */
  getStatus() {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.getStatus();
  }

  /**
   * Load a media object
   * @param {Object} media - Media to load
   * @param {Object} [options = {}] - Options
   * @returns {Promise}
   */
  load(media: any, options = {}) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.load(media, options);
  }

  /**
   * Play the media
   * @returns {Promise}
   */
  play() {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.play();
  }

  /**
   * Pause the media
   * @returns {Promise}
   */
  pause() {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.pause();
  }

  /**
   * Stop the media
   * @returns {Promise}
   */
  stop() {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.stop();
  }

  /**
   * Seek through the media
   * @param {number} currentTime - Time to seek to
   */
  seek(currentTime: number) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.seek(currentTime);
  }

  /**
   * Load a queue of items to play (playlist)
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueLoadRequest
   * @param {Object[]} items - Items to load into the queue
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueLoad(items: any[], options = {}) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.queueLoad(items, options);
  }

  /**
   * Insert items into the queue
   * @param {Object[]} items - Items to insert
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueInsert(items: any[], options = {}) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.queueInsert(items, options);
  }

  /**
   * Remove items from the queue
   * @param {String[]} itemIds - IDs to remove
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueRemove(itemIds: string[], options = {}) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.queueRemove(itemIds, options);
  }

  /**
   * Reorder the queue
   * @param {String[]} itemIds - IDs to reorder
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueReorder(itemIds: string[], options = {}) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.queueReorder(itemIds, options);
  }

  /**
   * Update the queue
   * @param {Object[]} items - Items
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueUpdate(items: any[], options = {}) {

    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.queueUpdate(items, options);
  }
}
