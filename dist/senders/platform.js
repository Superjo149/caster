"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _castv = require("castv2");

var _sender = _interopRequireDefault(require("./sender"));

var _connection = _interopRequireDefault(require("../controllers/connection"));

var _heartbeat = _interopRequireDefault(require("../controllers/heartbeat"));

var _receiver = _interopRequireDefault(require("../controllers/receiver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PlatformSender extends _sender.default {
  constructor() {
    super(new _castv.Client(), 'sender-0', 'receiver-0');
    this.connection = void 0;
    this.heartbeat = void 0;
    this.receiver = void 0;
  }
  /**
   * Connect
   */


  connect(options) {
    const self = this;
    return new Promise(resolve => {
      if (!this.client) {
        return;
      }

      this.client.on('error', err => {
        this.emit('error', err);
      });
      this.client.connect(options, () => {
        this.connection = this.createController(_connection.default);
        this.heartbeat = this.createController(_heartbeat.default);
        this.receiver = this.createController(_receiver.default);

        function onStatus(status) {
          self.emit('status', status);
        }

        this.receiver.on('status', onStatus);

        if (!this.client) {
          return;
        }

        this.client.once('close', () => {
          this.heartbeat && this.heartbeat.stop();
          this.receiver && this.receiver.removeListener('status', onStatus);
          this.receiver && this.receiver.close();
          this.heartbeat && this.heartbeat.close();
          this.connection && this.connection.close();
          this.receiver = undefined;
          this.heartbeat = undefined;
          this.connection = undefined;
          super.close();
        });
        this.heartbeat.once('timeout', () => {
          this.emit('error', new Error('Device timeout'));
        });
        this.connection.connect();
        this.heartbeat.start();
        resolve();
      });
    });
  }
  /**
   * Close
   */


  close() {
    this.client && this.client.close();
  }
  /**
   * Get the status
   */


  getStatus() {
    if (!this.receiver) {
      throw new Error("Connection has been closed");
    }

    return this.receiver.getStatus();
  }
  /**
   * Get the sessions
   */


  getSessions() {
    if (!this.receiver) {
      throw new Error("Connection has been closed");
    }

    return this.receiver.getSessions();
  }
  /**
   * Get app availability
   */


  getAppAvailability(appId) {
    return new Promise((resolve, reject) => {
      if (!this.receiver) {
        throw new Error("Connection has been closed");
      }

      this.receiver.getAppAvailability(appId).then(availability => {
        for (const key in availability) {
          availability[key] = availability[key] === 'APP_AVAILABLE';
        }

        resolve(availability);
      }).catch(err => reject(err));
    });
  }
  /**
   * Join
   */


  join(session, Application) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (!this.client) {
          return reject(new Error("Connection has been closed"));
        }

        resolve(new Application(this.client, session));
      });
    });
  }
  /**
   * Launch an application
   * @param {Application} application - Application
   * @returns {Promise}
   */


  launch(application) {
    return new Promise((resolve, reject) => {
      if (!this.receiver) {
        return reject(new Error("Connection has been closed"));
      }

      this.receiver.launch(application.APP_ID).then(sessions => {
        const filtered = sessions.filter(session => session.appId === application.APP_ID);
        const session = filtered.shift();

        if (!session) {
          return reject(new Error("Invalid session"));
        }

        return this.join(session, application).then(response => resolve(response)).catch(err => reject(err));
      }).catch(err => reject(err));
    });
  }
  /**
   * Close an application and stop it
   */


  stop(application) {
    if (!this.receiver) {
      throw new Error("Connection has been closed");
    }

    const {
      session
    } = application;
    application.close();

    if (!session) {
      return Promise.resolve();
    }

    return this.receiver.stop(session.sessionId);
  }
  /**
   * Set the volume
   */


  setVolume(volume) {
    if (!this.receiver) {
      throw new Error('No receiver');
    }

    return this.receiver.setVolume(volume);
  }
  /**
   * Get the volume
   */


  getVolume() {
    if (!this.receiver) {
      throw new Error('No receiver');
    }

    return this.receiver.getVolume();
  }

}

exports.default = PlatformSender;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZW5kZXJzL3BsYXRmb3JtLnRzIl0sIm5hbWVzIjpbIlBsYXRmb3JtU2VuZGVyIiwiU2VuZGVyIiwiY29uc3RydWN0b3IiLCJDbGllbnQiLCJjb25uZWN0aW9uIiwiaGVhcnRiZWF0IiwicmVjZWl2ZXIiLCJjb25uZWN0Iiwib3B0aW9ucyIsInNlbGYiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNsaWVudCIsIm9uIiwiZXJyIiwiZW1pdCIsImNyZWF0ZUNvbnRyb2xsZXIiLCJDb25uZWN0aW9uQ29udHJvbGxlciIsIkhlYXJ0YmVhdENvbnRyb2xsZXIiLCJSZWNlaXZlckNvbnRyb2xsZXIiLCJvblN0YXR1cyIsInN0YXR1cyIsIm9uY2UiLCJzdG9wIiwicmVtb3ZlTGlzdGVuZXIiLCJjbG9zZSIsInVuZGVmaW5lZCIsIkVycm9yIiwic3RhcnQiLCJnZXRTdGF0dXMiLCJnZXRTZXNzaW9ucyIsImdldEFwcEF2YWlsYWJpbGl0eSIsImFwcElkIiwicmVqZWN0IiwidGhlbiIsImF2YWlsYWJpbGl0eSIsImtleSIsImNhdGNoIiwiam9pbiIsInNlc3Npb24iLCJBcHBsaWNhdGlvbiIsInByb2Nlc3MiLCJuZXh0VGljayIsImxhdW5jaCIsImFwcGxpY2F0aW9uIiwiQVBQX0lEIiwic2Vzc2lvbnMiLCJmaWx0ZXJlZCIsImZpbHRlciIsInNoaWZ0IiwicmVzcG9uc2UiLCJzZXNzaW9uSWQiLCJzZXRWb2x1bWUiLCJ2b2x1bWUiLCJnZXRWb2x1bWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUdlLE1BQU1BLGNBQU4sU0FBNkJDLGVBQTdCLENBQW9DO0FBS2pEQyxFQUFBQSxXQUFXLEdBQUc7QUFDWixVQUFNLElBQUlDLGFBQUosRUFBTixFQUFvQixVQUFwQixFQUFnQyxZQUFoQztBQURZLFNBSmRDLFVBSWM7QUFBQSxTQUhkQyxTQUdjO0FBQUEsU0FGZEMsUUFFYztBQUViO0FBRUQ7Ozs7O0FB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RUQsV0FBTyxLQUFLTCxRQUFMLENBQWNpQixJQUFkLENBQW1CZ0IsT0FBTyxDQUFDWSxTQUEzQixDQUFQO0FBQ0Q7QUFFRDs7Ozs7QUFHQUMsRUFBQUEsU0FBUyxDQUFDQyxNQUFELEVBQWlCO0FBQ3hCLFFBQUksQ0FBQyxLQUFLL0MsUUFBVixFQUFvQjtBQUNsQixZQUFNLElBQUlxQixLQUFKLENBQVUsYUFBVixDQUFOO0FBQ0Q7O0FBQ0QsV0FBTyxLQUFLckIsUUFBTCxDQUFjOEMsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7O0FBR0FDLEVBQUFBLFNBQVMsR0FBRztBQUNWLFFBQUksQ0FBQyxLQUFLaEQsUUFBVixFQUFvQjtBQUNsQixZQUFNLElBQUlxQixLQUFKLENBQVUsYUFBVixDQUFOO0FBQ0Q7O0FBQ0QsV0FBTyxLQUFLckIsUUFBTCxDQUFjZ0QsU0FBZCxFQUFQO0FBQ0Q7O0FBbE1nRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCwgQ29ubmVjdE9wdGlvbnMsIFNlc3Npb24gfSBmcm9tICdjYXN0djInO1xuaW1wb3J0IFNlbmRlciBmcm9tICcuL3NlbmRlcic7XG5pbXBvcnQgQ29ubmVjdGlvbkNvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvY29ubmVjdGlvbic7XG5pbXBvcnQgSGVhcnRiZWF0Q29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9oZWFydGJlYXQnO1xuaW1wb3J0IFJlY2VpdmVyQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9yZWNlaXZlcic7XG5pbXBvcnQgeyBBcHBsaWNhdGlvbiB9IGZyb20gJy4uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGxhdGZvcm1TZW5kZXIgZXh0ZW5kcyBTZW5kZXIge1xuICBjb25uZWN0aW9uPzogQ29ubmVjdGlvbkNvbnRyb2xsZXI7XG4gIGhlYXJ0YmVhdD86IEhlYXJ0YmVhdENvbnRyb2xsZXI7XG4gIHJlY2VpdmVyPzogUmVjZWl2ZXJDb250cm9sbGVyO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKG5ldyBDbGllbnQoKSwgJ3NlbmRlci0wJywgJ3JlY2VpdmVyLTAnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0XG4gICAqL1xuICBjb25uZWN0KG9wdGlvbnM6IENvbm5lY3RPcHRpb25zKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXG4gICAgICBpZiAoIXRoaXMuY2xpZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jbGllbnQub24oJ2Vycm9yJywgZXJyID0+IHtcbiAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5jbGllbnQuY29ubmVjdChvcHRpb25zLCAoKSA9PiB7XG4gICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IHRoaXMuY3JlYXRlQ29udHJvbGxlcihDb25uZWN0aW9uQ29udHJvbGxlcik7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0ID0gdGhpcy5jcmVhdGVDb250cm9sbGVyKEhlYXJ0YmVhdENvbnRyb2xsZXIpO1xuICAgICAgICB0aGlzLnJlY2VpdmVyID0gdGhpcy5jcmVhdGVDb250cm9sbGVyKFJlY2VpdmVyQ29udHJvbGxlcik7XG5cbiAgICAgICAgZnVuY3Rpb24gb25TdGF0dXMoc3RhdHVzOiBzdHJpbmcpIHtcbiAgICAgICAgICBzZWxmLmVtaXQoJ3N0YXR1cycsIHN0YXR1cyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlY2VpdmVyLm9uKCdzdGF0dXMnLCBvblN0YXR1cyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmNsaWVudCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2xpZW50Lm9uY2UoJ2Nsb3NlJywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGVhcnRiZWF0ICYmIHRoaXMuaGVhcnRiZWF0LnN0b3AoKTtcbiAgICAgICAgICB0aGlzLnJlY2VpdmVyICYmIHRoaXMucmVjZWl2ZXIucmVtb3ZlTGlzdGVuZXIoJ3N0YXR1cycsIG9uU3RhdHVzKTtcbiAgICAgICAgICB0aGlzLnJlY2VpdmVyICYmIHRoaXMucmVjZWl2ZXIuY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLmhlYXJ0YmVhdCAmJiB0aGlzLmhlYXJ0YmVhdC5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiAmJiB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICB0aGlzLnJlY2VpdmVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuaGVhcnRiZWF0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBzdXBlci5jbG9zZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmhlYXJ0YmVhdC5vbmNlKCd0aW1lb3V0JywgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ0RldmljZSB0aW1lb3V0JykpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmhlYXJ0YmVhdC5zdGFydCgpO1xuXG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENsb3NlXG4gICAqL1xuICBjbG9zZSgpIHtcbiAgICB0aGlzLmNsaWVudCAmJiB0aGlzLmNsaWVudC5jbG9zZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgc3RhdHVzXG4gICAqL1xuICBnZXRTdGF0dXMoKSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZXIuZ2V0U3RhdHVzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzZXNzaW9uc1xuICAgKi9cbiAgZ2V0U2Vzc2lvbnMoKSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZXIuZ2V0U2Vzc2lvbnMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYXBwIGF2YWlsYWJpbGl0eVxuICAgKi9cbiAgZ2V0QXBwQXZhaWxhYmlsaXR5KGFwcElkOiBzdHJpbmcpIHtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWRcIik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVjZWl2ZXJcbiAgICAgICAgLmdldEFwcEF2YWlsYWJpbGl0eShhcHBJZClcbiAgICAgICAgLnRoZW4oKGF2YWlsYWJpbGl0eTogYW55KSA9PiB7XG4gICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gYXZhaWxhYmlsaXR5KSB7XG4gICAgICAgICAgICBhdmFpbGFiaWxpdHlba2V5XSA9IGF2YWlsYWJpbGl0eVtrZXldID09PSAnQVBQX0FWQUlMQUJMRSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoYXZhaWxhYmlsaXR5KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSm9pblxuICAgKi9cbiAgam9pbjxUIGV4dGVuZHMgYW55PihzZXNzaW9uOiBTZXNzaW9uLCBBcHBsaWNhdGlvbjogVCk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmNsaWVudCkge1xuICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFwiQ29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWRcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVzb2x2ZShuZXcgQXBwbGljYXRpb24odGhpcy5jbGllbnQsIHNlc3Npb24pKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIExhdW5jaCBhbiBhcHBsaWNhdGlvblxuICAgKiBAcGFyYW0ge0FwcGxpY2F0aW9ufSBhcHBsaWNhdGlvbiAtIEFwcGxpY2F0aW9uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgKi9cbiAgbGF1bmNoPFQgZXh0ZW5kcyBhbnk+KGFwcGxpY2F0aW9uOiBhbnkpOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnJlY2VpdmVyKSB7XG4gICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFwiQ29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWRcIikpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLnJlY2VpdmVyXG4gICAgICAgIC5sYXVuY2goYXBwbGljYXRpb24uQVBQX0lEKVxuICAgICAgICAudGhlbigoc2Vzc2lvbnM6IFNlc3Npb25bXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZpbHRlcmVkID0gc2Vzc2lvbnMuZmlsdGVyKFxuICAgICAgICAgICAgc2Vzc2lvbiA9PiBzZXNzaW9uLmFwcElkID09PSBhcHBsaWNhdGlvbi5BUFBfSURcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uc3Qgc2Vzc2lvbiA9IGZpbHRlcmVkLnNoaWZ0KCk7XG5cbiAgICAgICAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgICAgICAgIHJldHVybiByZWplY3QobmV3IEVycm9yKFwiSW52YWxpZCBzZXNzaW9uXCIpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcy5qb2luPFQ+KHNlc3Npb24sIGFwcGxpY2F0aW9uKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzb2x2ZShyZXNwb25zZSkpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiByZWplY3QoZXJyKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgYW4gYXBwbGljYXRpb24gYW5kIHN0b3AgaXRcbiAgICovXG4gIHN0b3AoYXBwbGljYXRpb246IEFwcGxpY2F0aW9uKTogUHJvbWlzZTxhbnk+IHtcbiAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkXCIpO1xuICAgIH1cbiAgICBjb25zdCB7IHNlc3Npb24gfSA9IGFwcGxpY2F0aW9uO1xuICAgIGFwcGxpY2F0aW9uLmNsb3NlKCk7XG5cbiAgICBpZiAoIXNlc3Npb24pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5yZWNlaXZlci5zdG9wKHNlc3Npb24uc2Vzc2lvbklkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIHZvbHVtZVxuICAgKi9cbiAgc2V0Vm9sdW1lKHZvbHVtZTogT2JqZWN0KSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlY2VpdmVyJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlY2VpdmVyLnNldFZvbHVtZSh2b2x1bWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdm9sdW1lXG4gICAqL1xuICBnZXRWb2x1bWUoKSB7XG4gICAgaWYgKCF0aGlzLnJlY2VpdmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlY2VpdmVyJyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlY2VpdmVyLmdldFZvbHVtZSgpO1xuICB9XG59XG4iXX0=