import { Client } from 'castv2';
import RequestResponseController from './request-response';

export default class MediaController extends RequestResponseController {
  private currentSession: any;

  constructor(client: Client, sourceId: string, destinationId: string) {
    super(client, sourceId, destinationId, 'urn:x-cast:com.google.cast.media');
    this.currentSession = null;
    const self = this;
    function onMessage(data: any, broadcast: any) {
      if (data.type === 'MEDIA_STATUS' && broadcast) {
        const status = data.status[0];
        if (!status) return;
        self.currentSession = status;
        self.emit('status', status);
      }
    }

    function onClose() {
      self.removeListener('message', onMessage);
      self.stop();
    }
    this.on('message', onMessage);
    this.once('close', onClose);
  }

  /**
   * Get the status
   * @returns a promise containing the status
   */
  getStatus(): Promise<string> {
    return this
      .request({
        type: 'GET_STATUS'
      })
      .then((response) => {
        const status = response.status[0];
        this.currentSession = status;

        return status;
      });
  }

  /**
   * Load media
   * @param {Object} media
   * @param {Object} [options = {}]
   * @returns {Promise}
   */
  load(media: any, options = {}) {
    return new Promise((resolve, reject) => {
      const data = Object.assign(
        {
          type: 'LOAD',
          media,
          autoplay: false,
          currentTime: 0,
          activeTrackIds: [],
          repeatMode: 'REPEAT_OFF'
        },
        options
      );
      this.request(data)
        .then(response => {
          if (response.type === 'LOAD_FAILED')
            return reject(new Error('Load failed'));
          if (response.type === 'LOAD_CANCELLED')
            return reject(new Error('Load cancelled'));
          const status = response.status[0];
          return resolve(status);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Session request
   * @param {Object} data
   * @returns {Promise}
   */
  sessionRequest(data: { type: string; [key: string]: any; }) {
    return new Promise((resolve, reject) => {
      data.mediaSessionId = this.currentSession.mediaSessionId;
      this.request(data)
        .then(response => {
          const status = response.status[0];
          return resolve(status);
        })
        .catch(err => reject(err));
    });
  }

  /**
   * Play the media
   * @returns {Promise}
   */
  play() {
    return new Promise((resolve, reject) => {
      this.sessionRequest({
        type: 'PLAY'
      })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Pause the media
   * @returns {Promise}
   */
  pause() {
    return new Promise((resolve, reject) => {
      this.sessionRequest({
        type: 'PAUSE'
      })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Stop the media
   * @returns {Promise}
   */
  stop() {
    return new Promise((resolve, reject) => {
      this.sessionRequest({
        type: 'STOP'
      })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Seek through the media
   * @param {Number} currentTime - Time to seek to
   * @returns {Promise}
   */
  seek(currentTime: number) {
    return new Promise((resolve, reject) => {
      this.sessionRequest({
        type: 'SEEK',
        currentTime
      })
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Load a queue of items to play (playlist)
   * @see https://developers.google.com/cast/docs/reference/chrome/chrome.cast.media.QueueLoadRequest
   * @param {Object[]} items - Items to load into the queue
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueLoad(items: Object[], options: Object = {}) {
    return new Promise((resolve, reject) => {
      const data = Object.assign(
        {},
        {
          type: 'QUEUE_LOAD',
          repeatMode: 'REPEAT_OFF',
          startIndex: 0,
          items
        },
        options
      );

      this.request(data)
        .then(response => {
          if (response.type === 'LOAD_FAILED')
            return reject(new Error('queueLoad failed'));
          if (response.type === 'LOAD_CANCELLED')
            return reject(new Error('queueLoad cancelled'));
          const status = response.status[0];
          return resolve(status);
        })
        .catch(console.log);
    });
  }

  /**
   * Insert items into the queue
   * @param {Object[]} items - Items to insert
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueInsert(items: Object[], options: Object) {
    return new Promise((resolve, reject) => {
      const data = Object.assign(
        {
          type: 'QUEUE_INSERT',
          items
        },
        options
      );
      this.sessionRequest(data)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Remove items from the queue
   * @param {String[]} itemIds - IDs to remove
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueRemove(itemIds: string[], options: Object) {
    return new Promise((resolve, reject) => {
      const data = Object.assign(
        {
          type: 'QUEUE_REMOVE',
          itemIds
        },
        options
      );
      this.sessionRequest(data)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Reorder the queue
   * @param {String[]} itemIds - IDs to reorder
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueReorder(itemIds: string[], options: Object) {
    return new Promise((resolve, reject) => {
      const data = Object.assign(
        {
          type: 'QUEUE_REORDER',
          itemIds
        },
        options
      );
      this.sessionRequest(data)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }

  /**
   * Update the queue
   * @param {Object[]} items - Items
   * @param {Object} options - Options
   * @returns {Promise}
   */
  queueUpdate(items: Object[], options: Object) {
    return new Promise((resolve, reject) => {
      const data = Object.assign(
        {
          type: 'QUEUE_UPDATE',
          items
        },
        options
      );
      this.sessionRequest(data)
        .then(response => resolve(response))
        .catch(err => reject(err));
    });
  }
}
