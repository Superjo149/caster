"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _application = _interopRequireDefault(require("./application"));

var _media = _interopRequireDefault(require("../controllers/media"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DefaultMediaReceiver extends _application.default {
  constructor(client, session) {
    super(client, session);
    /**
     * Media controller
     * @type {MediaController}
     */

    this.APP_ID = 'CC1AD845';
    this.media = void 0;
    this.media = this.createController(_media.default);
    const self = this;

    function onDisconnect() {
      self.emit('close');
    }

    function onStatus(status) {
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


  load(media, options = {}) {
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


  seek(currentTime) {
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


  queueLoad(items, options = {}) {
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


  queueInsert(items, options = {}) {
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


  queueRemove(itemIds, options = {}) {
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


  queueReorder(itemIds, options = {}) {
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


  queueUpdate(items, options = {}) {
    if (!this.media) {
      throw new Error("no media");
    }

    return this.media.queueUpdate(items, options);
  }

}

exports.default = DefaultMediaReceiver;
DefaultMediaReceiver.APP_ID = 'CC1AD845';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZW5kZXJzL2RlZmF1bHQtbWVkaWEtcmVjZWl2ZXIudHMiXSwibmFtZXMiOlsiRGVmYXVsdE1lZGlhUmVjZWl2ZXIiLCJBcHBsaWNhdGlvbiIsImNvbnN0cnVjdG9yIiwiY2xpZW50Iiwic2Vzc2lvbiIsIkFQUF9JRCIsIm1lZGlhIiwiY3JlYXRlQ29udHJvbGxlciIsIk1lZGlhQ29udHJvbGxlciIsInNlbGYiLCJvbkRpc2Nvbm5lY3QiLCJlbWl0Iiwib25TdGF0dXMiLCJzdGF0dXMiLCJvbkNsb3NlIiwicmVtb3ZlTGlzdGVuZXIiLCJjbG9zZSIsInVuZGVmaW5lZCIsIkVycm9yIiwib24iLCJvbmNlIiwiZ2V0U3RhdHVzIiwibG9hZCIsIm9wdGlvbnMiLCJwbGF5IiwicGF1c2UiLCJzdG9wIiwic2VlayIsImN1cnJlbnRUaW1lIiwicXVldWVMb2FkIiwiaXRlbXMiLCJxdWV1ZUluc2VydCIsInF1ZXVlUmVtb3ZlIiwiaXRlbUlkcyIsInF1ZXVlUmVvcmRlciIsInF1ZXVlVXBkYXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFFZSxNQUFNQSxvQkFBTixTQUFtQ0Msb0JBQW5DLENBQStDO0FBTTVEQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBaUJDLE9BQWpCLEVBQStCO0FBQ3hDLFVBQU1ELE1BQU4sRUFBY0MsT0FBZDtBQUVBOzs7OztBQUh3QyxTQUgxQ0MsTUFHMEMsR0FIekIsVUFHeUI7QUFBQSxTQUZsQ0MsS0FFa0M7QUFPeEMsU0FBS0EsS0FBTCxHQUFhLEtBQUtDLGdCQUFMLENBQXNCQyxjQUF0QixDQUFiO0FBQ0EsVUFBTUMsSUFBSSxHQUFHLElBQWI7O0FBQ0EsYUFBU0MsWUFBVCxHQUF3QjtBQUN0QkQsTUFBQUEsSUFBSSxDQUFDRSxJQUFMLENBQVUsT0FBVjtBQUNEOztBQUNELGFBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQWtDO0FBQ2hDSixNQUFBQSxJQUFJLENBQUNFLElBQUwsQ0FBVSxR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RXRDLFFBQUksQ0FBQyxLQUFLakIsS0FBVixFQUFpQjtBQUNmLFlBQU0sSUFBSVksS0FBSixDQUFVLFVBQVYsQ0FBTjtBQUNEOztBQUVELFdBQU8sS0FBS1osS0FBTCxDQUFXeUIsV0FBWCxDQUF1QkQsS0FBdkIsRUFBOEJQLE9BQTlCLENBQVA7QUFDRDtBQUVEOzs7Ozs7OztBQU1BUyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBb0JWLE9BQU8sR0FBRyxFQUE5QixFQUFrQztBQUUzQyxRQUFJLENBQUMsS0FBS2pCLEtBQVYsRUFBaUI7QUFDZixZQUFNLElBQUlZLEtBQUosQ0FBVSxVQUFWLENBQU47QUFDRDs7QUFFRCxXQUFPLEtBQUtaLEtBQUwsQ0FBVzBCLFdBQVgsQ0FBdUJDLE9BQXZCLEVBQWdDVixPQUFoQyxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7QUFNQVcsRUFBQUEsWUFBWSxDQUFDRCxPQUFELEVBQW9CVixPQUFPLEdBQUcsRUFBOUIsRUFBa0M7QUFFNUMsUUFBSSxDQUFDLEtBQUtqQixLQUFWLEVBQWlCO0FBQ2YsWUFBTSxJQUFJWSxLQUFKLENBQVUsVUFBVixDQUFOO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLWixLQUFMLENBQVc0QixZQUFYLENBQXdCRCxPQUF4QixFQUFpQ1YsT0FBakMsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTUFZLEVBQUFBLFdBQVcsQ0FBQ0wsS0FBRCxFQUFlUCxPQUFPLEdBQUcsRUFBekIsRUFBNkI7QUFFdEMsUUFBSSxDQUFDLEtBQUtqQixLQUFWLEVBQWlCO0FBQ2YsWUFBTSxJQUFJWSxLQUFKLENBQVUsVUFBVixDQUFOO0FBQ0Q7O0FBRUQsV0FBTyxLQUFLWixLQUFMLENBQVc2QixXQUFYLENBQXVCTCxLQUF2QixFQUE4QlAsT0FBOUIsQ0FBUDtBQUNEOztBQWxNMkQ7OztBQUF6Q3ZCLG9CLENBQ1pLLE0sR0FBaUIsVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCB9IGZyb20gJ2Nhc3R2Mic7XG5pbXBvcnQgQXBwbGljYXRpb24gZnJvbSAnLi9hcHBsaWNhdGlvbic7XG5pbXBvcnQgTWVkaWFDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL21lZGlhJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGVmYXVsdE1lZGlhUmVjZWl2ZXIgZXh0ZW5kcyBBcHBsaWNhdGlvbiB7XG4gIHN0YXRpYyBBUFBfSUQ6IHN0cmluZyA9ICdDQzFBRDg0NSc7XG5cbiAgQVBQX0lEOiBzdHJpbmcgPSAnQ0MxQUQ4NDUnO1xuICBwcml2YXRlIG1lZGlhOiBNZWRpYUNvbnRyb2xsZXIgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoY2xpZW50OiBDbGllbnQsIHNlc3Npb246IGFueSkge1xuICAgIHN1cGVyKGNsaWVudCwgc2Vzc2lvbik7XG5cbiAgICAvKipcbiAgICAgKiBNZWRpYSBjb250cm9sbGVyXG4gICAgICogQHR5cGUge01lZGlhQ29udHJvbGxlcn1cbiAgICAgKi9cbiAgICB0aGlzLm1lZGlhID0gdGhpcy5jcmVhdGVDb250cm9sbGVyKE1lZGlhQ29udHJvbGxlcik7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gb25EaXNjb25uZWN0KCkge1xuICAgICAgc2VsZi5lbWl0KCdjbG9zZScpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvblN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgICAgc2VsZi5lbWl0KCdzdGF0dXMnLCBzdGF0dXMpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBvbkNsb3NlKCkge1xuICAgICAgaWYgKCFzZWxmLm1lZGlhKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNlbGYubWVkaWEucmVtb3ZlTGlzdGVuZXIoJ2Rpc2Nvbm5lY3QnLCBvbkRpc2Nvbm5lY3QpO1xuICAgICAgc2VsZi5tZWRpYS5yZW1vdmVMaXN0ZW5lcignc3RhdHVzJywgb25TdGF0dXMpO1xuICAgICAgc2VsZi5tZWRpYS5jbG9zZSgpO1xuICAgICAgc2VsZi5tZWRpYSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubWVkaWEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIG1lZGlhXCIpO1xuICAgIH1cblxuICAgIHRoaXMubWVkaWEub24oJ3N0YXR1cycsIG9uU3RhdHVzKTtcbiAgICB0aGlzLm9uY2UoJ2Nsb3NlJywgb25DbG9zZSk7XG4gICAgdGhpcy5tZWRpYS5vbignZGlzY29ubmVjdCcsIG9uRGlzY29ubmVjdCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzdGF0dXNcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBnZXRTdGF0dXMoKSB7XG5cbiAgICBpZiAoIXRoaXMubWVkaWEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIG1lZGlhXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lZGlhLmdldFN0YXR1cygpO1xuICB9XG5cbiAgLyoqXG4gICAqIExvYWQgYSBtZWRpYSBvYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IG1lZGlhIC0gTWVkaWEgdG8gbG9hZFxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnMgPSB7fV0gLSBPcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbG9hZChtZWRpYTogYW55LCBvcHRpb25zID0ge30pIHtcblxuICAgIGlmICghdGhpcy5tZWRpYSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gbWVkaWFcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWVkaWEubG9hZChtZWRpYSwgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogUGxheSB0aGUgbWVkaWFcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBwbGF5KCkge1xuXG4gICAgaWYgKCF0aGlzLm1lZGlhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBtZWRpYVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZWRpYS5wbGF5KCk7XG4gIH1cblxuICAvKipcbiAgICogUGF1c2UgdGhlIG1lZGlhXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgcGF1c2UoKSB7XG5cbiAgICBpZiAoIXRoaXMubWVkaWEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIG1lZGlhXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lZGlhLnBhdXNlKCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCB0aGUgbWVkaWFcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBzdG9wKCkge1xuXG4gICAgaWYgKCF0aGlzLm1lZGlhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBtZWRpYVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZWRpYS5zdG9wKCk7XG4gIH1cblxuICAvKipcbiAgICogU2VlayB0aHJvdWdoIHRoZSBtZWRpYVxuICAgKiBAcGFyYW0ge251bWJlcn0gY3VycmVudFRpbWUgLSBUaW1lIHRvIHNlZWsgdG9cbiAgICovXG4gIHNlZWsoY3VycmVudFRpbWU6IG51bWJlcikge1xuXG4gICAgaWYgKCF0aGlzLm1lZGlhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBtZWRpYVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZWRpYS5zZWVrKGN1cnJlbnRUaW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBMb2FkIGEgcXVldWUgb2YgaXRlbXMgdG8gcGxheSAocGxheWxpc3QpXG4gICAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vY2FzdC9kb2NzL3JlZmVyZW5jZS9jaHJvbWUvY2hyb21lLmNhc3QubWVkaWEuUXVldWVMb2FkUmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdFtdfSBpdGVtcyAtIEl0ZW1zIHRvIGxvYWQgaW50byB0aGUgcXVldWVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgcXVldWVMb2FkKGl0ZW1zOiBhbnlbXSwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICBpZiAoIXRoaXMubWVkaWEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIG1lZGlhXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lZGlhLnF1ZXVlTG9hZChpdGVtcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IGl0ZW1zIGludG8gdGhlIHF1ZXVlXG4gICAqIEBwYXJhbSB7T2JqZWN0W119IGl0ZW1zIC0gSXRlbXMgdG8gaW5zZXJ0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uc1xuICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICovXG4gIHF1ZXVlSW5zZXJ0KGl0ZW1zOiBhbnlbXSwgb3B0aW9ucyA9IHt9KSB7XG5cbiAgICBpZiAoIXRoaXMubWVkaWEpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIm5vIG1lZGlhXCIpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLm1lZGlhLnF1ZXVlSW5zZXJ0KGl0ZW1zLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgaXRlbXMgZnJvbSB0aGUgcXVldWVcbiAgICogQHBhcmFtIHtTdHJpbmdbXX0gaXRlbUlkcyAtIElEcyB0byByZW1vdmVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgcXVldWVSZW1vdmUoaXRlbUlkczogc3RyaW5nW10sIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgaWYgKCF0aGlzLm1lZGlhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBtZWRpYVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZWRpYS5xdWV1ZVJlbW92ZShpdGVtSWRzLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW9yZGVyIHRoZSBxdWV1ZVxuICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBpdGVtSWRzIC0gSURzIHRvIHJlb3JkZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBPcHRpb25zXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgcXVldWVSZW9yZGVyKGl0ZW1JZHM6IHN0cmluZ1tdLCBvcHRpb25zID0ge30pIHtcblxuICAgIGlmICghdGhpcy5tZWRpYSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gbWVkaWFcIik7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubWVkaWEucXVldWVSZW9yZGVyKGl0ZW1JZHMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgcXVldWVcbiAgICogQHBhcmFtIHtPYmplY3RbXX0gaXRlbXMgLSBJdGVtc1xuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnNcbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBxdWV1ZVVwZGF0ZShpdGVtczogYW55W10sIG9wdGlvbnMgPSB7fSkge1xuXG4gICAgaWYgKCF0aGlzLm1lZGlhKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJubyBtZWRpYVwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5tZWRpYS5xdWV1ZVVwZGF0ZShpdGVtcywgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==