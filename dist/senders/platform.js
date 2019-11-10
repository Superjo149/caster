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


  join(session, application) {
    return new Promise((resolve, reject) => {
      process.nextTick(() => {
        if (!this.client) {
          return reject(new Error("Connection has been closed"));
        }

        resolve(new application(this.client, session));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZW5kZXJzL3BsYXRmb3JtLnRzIl0sIm5hbWVzIjpbIlBsYXRmb3JtU2VuZGVyIiwiU2VuZGVyIiwiY29uc3RydWN0b3IiLCJDbGllbnQiLCJjb25uZWN0aW9uIiwiaGVhcnRiZWF0IiwicmVjZWl2ZXIiLCJjb25uZWN0Iiwib3B0aW9ucyIsInNlbGYiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNsaWVudCIsIm9uIiwiZXJyIiwiZW1pdCIsImNyZWF0ZUNvbnRyb2xsZXIiLCJDb25uZWN0aW9uQ29udHJvbGxlciIsIkhlYXJ0YmVhdENvbnRyb2xsZXIiLCJSZWNlaXZlckNvbnRyb2xsZXIiLCJvblN0YXR1cyIsInN0YXR1cyIsIm9uY2UiLCJzdG9wIiwicmVtb3ZlTGlzdGVuZXIiLCJjbG9zZSIsInVuZGVmaW5lZCIsIkVycm9yIiwic3RhcnQiLCJnZXRTdGF0dXMiLCJnZXRTZXNzaW9ucyIsImdldEFwcEF2YWlsYWJpbGl0eSIsImFwcElkIiwicmVqZWN0IiwidGhlbiIsImF2YWlsYWJpbGl0eSIsImtleSIsImNhdGNoIiwiam9pbiIsInNlc3Npb24iLCJhcHBsaWNhdGlvbiIsInByb2Nlc3MiLCJuZXh0VGljayIsImxhdW5jaCIsIkFQUF9JRCIsInNlc3Npb25zIiwiZmlsdGVyZWQiLCJmaWx0ZXIiLCJzaGlmdCIsInJlc3BvbnNlIiwic2Vzc2lvbklkIiwic2V0Vm9sdW1lIiwidm9sdW1lIiwiZ2V0Vm9sdW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFHZSxNQUFNQSxjQUFOLFNBQTZCQyxlQUE3QixDQUFvQztBQUtqREMsRUFBQUEsV0FBVyxHQUFHO0FBQ1osVUFBTSxJQUFJQyxhQUFKLEVBQU4sRUFBb0IsVUFBcEIsRUFBZ0MsWUFBaEM7QUFEWSxTQUpkQyxVQUljO0FBQUEsU0FIZEMsU0FHYztBQUFBLFNBRmRDLFFBRWM7QUFFYjtBQUVEOzs7OztBQUdBQyxFQUFBQSxPQUFP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QUwsQ0FBY2lCLElBQWQsQ0FBbUJnQixPQUFPLENBQUNXLFNBQTNCLENBQVA7QUFDRDtBQUVEOzs7OztBQUdBQyxFQUFBQSxTQUFTLENBQUNDLE1BQUQsRUFBaUI7QUFDeEIsUUFBSSxDQUFDLEtBQUs5QyxRQUFWLEVBQW9CO0FBQ2xCLFlBQU0sSUFBSXFCLEtBQUosQ0FBVSxhQUFWLENBQU47QUFDRDs7QUFDRCxXQUFPLEtBQUtyQixRQUFMLENBQWM2QyxTQUFkLENBQXdCQyxNQUF4QixDQUFQO0FBQ0Q7QUFFRDs7Ozs7QUFHQUMsRUFBQUEsU0FBUyxHQUFHO0FBQ1YsUUFBSSxDQUFDLEtBQUsvQyxRQUFWLEVBQW9CO0FBQ2xCLFlBQU0sSUFBSXFCLEtBQUosQ0FBVSxhQUFWLENBQU47QUFDRDs7QUFDRCxXQUFPLEtBQUtyQixRQUFMLENBQWMrQyxTQUFkLEVBQVA7QUFDRDs7QUFsTWdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50LCBDb25uZWN0T3B0aW9ucywgU2Vzc2lvbiB9IGZyb20gJ2Nhc3R2Mic7XG5pbXBvcnQgU2VuZGVyIGZyb20gJy4vc2VuZGVyJztcbmltcG9ydCBDb25uZWN0aW9uQ29udHJvbGxlciBmcm9tICcuLi9jb250cm9sbGVycy9jb25uZWN0aW9uJztcbmltcG9ydCBIZWFydGJlYXRDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL2hlYXJ0YmVhdCc7XG5pbXBvcnQgUmVjZWl2ZXJDb250cm9sbGVyIGZyb20gJy4uL2NvbnRyb2xsZXJzL3JlY2VpdmVyJztcbmltcG9ydCB7IEFwcGxpY2F0aW9uIH0gZnJvbSAnLi4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF0Zm9ybVNlbmRlciBleHRlbmRzIFNlbmRlciB7XG4gIGNvbm5lY3Rpb24/OiBDb25uZWN0aW9uQ29udHJvbGxlcjtcbiAgaGVhcnRiZWF0PzogSGVhcnRiZWF0Q29udHJvbGxlcjtcbiAgcmVjZWl2ZXI/OiBSZWNlaXZlckNvbnRyb2xsZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIobmV3IENsaWVudCgpLCAnc2VuZGVyLTAnLCAncmVjZWl2ZXItMCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RcbiAgICovXG4gIGNvbm5lY3Qob3B0aW9uczogQ29ubmVjdE9wdGlvbnMpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cbiAgICAgIGlmICghdGhpcy5jbGllbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNsaWVudC5vbignZXJyb3InLCBlcnIgPT4ge1xuICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNsaWVudC5jb25uZWN0KG9wdGlvbnMsICgpID0+IHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gdGhpcy5jcmVhdGVDb250cm9sbGVyKENvbm5lY3Rpb25Db250cm9sbGVyKTtcbiAgICAgICAgdGhpcy5oZWFydGJlYXQgPSB0aGlzLmNyZWF0ZUNvbnRyb2xsZXIoSGVhcnRiZWF0Q29udHJvbGxlcik7XG4gICAgICAgIHRoaXMucmVjZWl2ZXIgPSB0aGlzLmNyZWF0ZUNvbnRyb2xsZXIoUmVjZWl2ZXJDb250cm9sbGVyKTtcblxuICAgICAgICBmdW5jdGlvbiBvblN0YXR1cyhzdGF0dXM6IHN0cmluZykge1xuICAgICAgICAgIHNlbGYuZW1pdCgnc3RhdHVzJywgc3RhdHVzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVjZWl2ZXIub24oJ3N0YXR1cycsIG9uU3RhdHVzKTtcblxuICAgICAgICBpZiAoIXRoaXMuY2xpZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jbGllbnQub25jZSgnY2xvc2UnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5oZWFydGJlYXQgJiYgdGhpcy5oZWFydGJlYXQuc3RvcCgpO1xuICAgICAgICAgIHRoaXMucmVjZWl2ZXIgJiYgdGhpcy5yZWNlaXZlci5yZW1vdmVMaXN0ZW5lcignc3RhdHVzJywgb25TdGF0dXMpO1xuICAgICAgICAgIHRoaXMucmVjZWl2ZXIgJiYgdGhpcy5yZWNlaXZlci5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuaGVhcnRiZWF0ICYmIHRoaXMuaGVhcnRiZWF0LmNsb3NlKCk7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uICYmIHRoaXMuY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMucmVjZWl2ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5oZWFydGJlYXQgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHN1cGVyLmNsb3NlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaGVhcnRiZWF0Lm9uY2UoJ3RpbWVvdXQnLCAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcignRGV2aWNlIHRpbWVvdXQnKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5jb25uZWN0KCk7XG4gICAgICAgIHRoaXMuaGVhcnRiZWF0LnN0YXJ0KCk7XG5cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2VcbiAgICovXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuY2xpZW50ICYmIHRoaXMuY2xpZW50LmNsb3NlKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBzdGF0dXNcbiAgICovXG4gIGdldFN0YXR1cygpIHtcbiAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWNlaXZlci5nZXRTdGF0dXMoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNlc3Npb25zXG4gICAqL1xuICBnZXRTZXNzaW9ucygpIHtcbiAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNvbm5lY3Rpb24gaGFzIGJlZW4gY2xvc2VkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZWNlaXZlci5nZXRTZXNzaW9ucygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhcHAgYXZhaWxhYmlsaXR5XG4gICAqL1xuICBnZXRBcHBBdmFpbGFiaWxpdHkoYXBwSWQ6IHN0cmluZykge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICghdGhpcy5yZWNlaXZlcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFwiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZWNlaXZlclxuICAgICAgICAuZ2V0QXBwQXZhaWxhYmlsaXR5KGFwcElkKVxuICAgICAgICAudGhlbigoYXZhaWxhYmlsaXR5OiBhbnkpID0+IHtcbiAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBhdmFpbGFiaWxpdHkpIHtcbiAgICAgICAgICAgIGF2YWlsYWJpbGl0eVtrZXldID0gYXZhaWxhYmlsaXR5W2tleV0gPT09ICdBUFBfQVZBSUxBQkxFJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzb2x2ZShhdmFpbGFiaWxpdHkpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBKb2luXG4gICAqL1xuICBqb2luPFQgZXh0ZW5kcyBhbnk+KHNlc3Npb246IFNlc3Npb24sIGFwcGxpY2F0aW9uOiBUKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBpZiAoIXRoaXMuY2xpZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFwiKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXNvbHZlKG5ldyBhcHBsaWNhdGlvbih0aGlzLmNsaWVudCwgc2Vzc2lvbikpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogTGF1bmNoIGFuIGFwcGxpY2F0aW9uXG4gICAqIEBwYXJhbSB7QXBwbGljYXRpb259IGFwcGxpY2F0aW9uIC0gQXBwbGljYXRpb25cbiAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAqL1xuICBsYXVuY2g8VCBleHRlbmRzIGFueT4oYXBwbGljYXRpb246IGFueSk6IFByb21pc2U8VD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJDb25uZWN0aW9uIGhhcyBiZWVuIGNsb3NlZFwiKSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMucmVjZWl2ZXJcbiAgICAgICAgLmxhdW5jaChhcHBsaWNhdGlvbi5BUFBfSUQpXG4gICAgICAgIC50aGVuKChzZXNzaW9uczogU2Vzc2lvbltdKSA9PiB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyZWQgPSBzZXNzaW9ucy5maWx0ZXIoXG4gICAgICAgICAgICBzZXNzaW9uID0+IHNlc3Npb24uYXBwSWQgPT09IGFwcGxpY2F0aW9uLkFQUF9JRFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCBzZXNzaW9uID0gZmlsdGVyZWQuc2hpZnQoKTtcblxuICAgICAgICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoXCJJbnZhbGlkIHNlc3Npb25cIikpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzLmpvaW48VD4oc2Vzc2lvbiwgYXBwbGljYXRpb24pXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNvbHZlKHJlc3BvbnNlKSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gcmVqZWN0KGVycikpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZXJyID0+IHJlamVjdChlcnIpKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbG9zZSBhbiBhcHBsaWNhdGlvbiBhbmQgc3RvcCBpdFxuICAgKi9cbiAgc3RvcChhcHBsaWNhdGlvbjogQXBwbGljYXRpb24pOiBQcm9taXNlPGFueT4ge1xuICAgIGlmICghdGhpcy5yZWNlaXZlcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ29ubmVjdGlvbiBoYXMgYmVlbiBjbG9zZWRcIik7XG4gICAgfVxuICAgIGNvbnN0IHsgc2Vzc2lvbiB9ID0gYXBwbGljYXRpb247XG4gICAgYXBwbGljYXRpb24uY2xvc2UoKTtcblxuICAgIGlmICghc2Vzc2lvbikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlY2VpdmVyLnN0b3Aoc2Vzc2lvbi5zZXNzaW9uSWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgdm9sdW1lXG4gICAqL1xuICBzZXRWb2x1bWUodm9sdW1lOiBPYmplY3QpIHtcbiAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVjZWl2ZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZXIuc2V0Vm9sdW1lKHZvbHVtZSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB2b2x1bWVcbiAgICovXG4gIGdldFZvbHVtZSgpIHtcbiAgICBpZiAoIXRoaXMucmVjZWl2ZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gcmVjZWl2ZXInKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVjZWl2ZXIuZ2V0Vm9sdW1lKCk7XG4gIH1cbn1cbiJdfQ==