"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _debug = _interopRequireDefault(require("debug"));

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const debug = (0, _debug.default)('castv2-client');
const DEFAULT_INTERVAL = 5; // seconds

const TIMEOUT_FACTOR = 3; // timeouts after 3 intervals

class HeartbeatController extends _json.default {
  constructor(client, sourceId, destinationId) {
    super(client, sourceId, destinationId, 'urn:x-cast:com.google.cast.tp.heartbeat');
    this.intervalValue = void 0;
    this.pingTimer = void 0;
    this.timeout = void 0;
    this.pingTimer = null;
    this.timeout = null;
    this.intervalValue = DEFAULT_INTERVAL;
    const self = this;

    function onMessage(data) {
      if (data.type === 'PONG') self.emit('pong');
    }

    function onClose() {
      self.removeListener('message', onMessage);
      self.stop();
    }

    this.on('message', onMessage);
    this.once('close', onClose);
  }

  ping() {
    debug('Received a .ping() before checking timeout');
    if (this.timeout) return; // We already have a ping in progress.

    debug('We do not have a timeout, so we are continuing');
    this.timeout = setTimeout(() => {
      this.emit('timeout');
    }, this.intervalValue * 1000 * TIMEOUT_FACTOR);
    this.once('pong', () => {
      clearTimeout(this.timeout);
      this.timeout = null;
      this.pingTimer = setTimeout(() => {
        this.pingTimer = null;
        this.ping();
      }, this.intervalValue * 1000);
    });
    this.send({
      type: 'PING'
    });
  }

  start(intervalValue) {
    this.intervalValue = intervalValue || this.intervalValue;
    this.ping();
  }

  stop() {
    if (this.pingTimer) clearTimeout(this.pingTimer);
    if (this.timeout) clearTimeout(this.timeout);
    this.removeAllListeners('pong');
  }

}

exports.default = HeartbeatController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9oZWFydGJlYXQudHMiXSwibmFtZXMiOlsiZGVidWciLCJERUZBVUxUX0lOVEVSVkFMIiwiVElNRU9VVF9GQUNUT1IiLCJIZWFydGJlYXRDb250cm9sbGVyIiwiSnNvbkNvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsImNsaWVudCIsInNvdXJjZUlkIiwiZGVzdGluYXRpb25JZCIsImludGVydmFsVmFsdWUiLCJwaW5nVGltZXIiLCJ0aW1lb3V0Iiwic2VsZiIsIm9uTWVzc2FnZSIsImRhdGEiLCJ0eXBlIiwiZW1pdCIsIm9uQ2xvc2UiLCJyZW1vdmVMaXN0ZW5lciIsInN0b3AiLCJvbiIsIm9uY2UiLCJwaW5nIiwic2V0VGltZW91dCIsImNsZWFyVGltZW91dCIsInNlbmQiLCJzdGFydCIsInJlbW92ZUFsbExpc3RlbmVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsS0FBSyxHQUFHLG9CQUFhLGVBQWIsQ0FBZDtBQUVBLE1BQU1DLGdCQUFnQixHQUFHLENBQXpCLEMsQ0FBNEI7O0FBQzVCLE1BQU1DLGNBQWMsR0FBRyxDQUF2QixDLENBQTBCOztBQUVYLE1BQU1DLG1CQUFOLFNBQWtDQyxhQUFsQyxDQUFpRDtBQUs5REMsRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQWlCQyxRQUFqQixFQUFtQ0MsYUFBbkMsRUFBMEQ7QUFDbkUsVUFDRUYsTUFERixFQUVFQyxRQUZGLEVBR0VDLGFBSEYsRUFJRSx5Q0FKRjtBQURtRSxTQUo3REMsYUFJNkQ7QUFBQSxTQUg3REMsU0FHNkQ7QUFBQSxTQUY3REMsT0FFNkQ7QUFPbkUsU0FBS0QsU0FBTCxHQUFpQixJQUFqQjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS0YsYUFBTCxHQUFxQlIsZ0JBQXJCO0FBQ0EsVUFBTVcsSUFBSSxHQUFHLElBQWI7O0FBQ0EsYUFBU0MsU0FBVCxDQUFtQkMsSUFBbkIsRUFBOEI7QUFDNUIsVUFBSUEsSUFBSSxDQUFDQyxJQUFMLEtBQWMsTUFBbEIsRUFBMEJILElBQUksQ0FBQ0ksSUFBTCxDQUFVLE1BQVY7QUFDM0I7O0FBQ0QsYUFBU0MsT0FBVCxHQUFtQjtBQUNqQkwsTUFBQUEsSUFBSSxDQUFDTSxjQUFMLENBQW9CLFNBQXBCLEVBQStCTCxTQUEvQjtBQUNBRCxNQUFBQSxJQUFJLENBQUNPLElBQUw7QUFDRDs7QUFDRCxTQUFLQyxFQUFMLENBQVEsU0FBUixFQUFtQlAsU0FBbkI7QUFDQSxTQUFLUSxJQUFMLENBQVUsT0FBVixFQUFtQkosT0FBbkI7QUFDRDs7QUFFREssRUFBQUEsSUFBSSxHQUFHO0FBQ0x0QixJQUFBQSxLQUFLLENBQUMsNENBQUQsQ0FBTDtBQUNBLFFBQUksS0FBS1csT0FBVCxFQUFrQixPQUZiLENBRXFCOztBQUMxQlgsSUFBQUEsS0FBSyxDQUFDLGdEQUFELENBQUw7QUFDQSxTQUFLVyxPQUFMLEdBQWVZLFVBQVUsQ0FBQyxNQUFNO0FBQzlCLFdBQUtQLElBQUwsQ0FBVSxTQUFWO0FBQ0QsS0FGd0IsRUFFdEIsS0FBS1AsYUFBTCxHQUFxQixJQUFyQixHQUE0QlAsY0FGTixDQUF6QjtBQUlBLFNBQUttQixJQUFMLENBQVUsTUFBVixFQUFrQixNQUFNO0FBQ3RCRyxNQUFBQSxZQUFZLENBQUMsS0FBS2IsT0FBTixDQUFaO0FBQ0EsV0FBS0EsT0FBTCxHQUFlLElBQWY7QUFFQSxXQUFLRCxTQUFMLEdBQWlCYSxVQUFVLENBQUMsTUFBTTtBQUNoQyxhQUFLYixTQUFMLEdBQWlCLElBQWpCO0FBQ0EsYUFBS1ksSUFBTDtBQUNELE9BSDBCLEVBR3hCLEtBQUtiLGFBQUwsR0FBcUIsSUFIRyxDQUEzQjtBQUlELEtBUkQ7QUFVQSxTQUFLZ0IsSUFBTCxDQUFVO0FBQ1JWLE1BQUFBLElBQUksRUFBRTtBQURFLEtBQVY7QUFHRDs7QUFFRFcsRUFBQUEsS0FBSyxDQUFDakIsYUFBRCxFQUF5QjtBQUM1QixTQUFLQSxhQUFMLEdBQXFCQSxhQUFhLElBQUksS0FBS0EsYUFBM0M7QUFDQSxTQUFLYSxJQUFMO0FBQ0Q7O0FBRURILEVBQUFBLElBQUksR0FBRztBQUNMLFFBQUksS0FBS1QsU0FBVCxFQUFvQmMsWUFBWSxDQUFDLEtBQUtkLFNBQU4sQ0FBWjtBQUNwQixRQUFJLEtBQUtDLE9BQVQsRUFBa0JhLFlBQVksQ0FBQyxLQUFLYixPQUFOLENBQVo7QUFDbEIsU0FBS2dCLGtCQUFMLENBQXdCLE1BQXhCO0FBQ0Q7O0FBM0Q2RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCB9IGZyb20gJ2Nhc3R2Mic7XG5pbXBvcnQgZGVidWdGYWN0b3J5IGZyb20gJ2RlYnVnJztcbmltcG9ydCBKc29uQ29udHJvbGxlciBmcm9tICcuL2pzb24nO1xuXG5jb25zdCBkZWJ1ZyA9IGRlYnVnRmFjdG9yeSgnY2FzdHYyLWNsaWVudCcpO1xuXG5jb25zdCBERUZBVUxUX0lOVEVSVkFMID0gNTsgLy8gc2Vjb25kc1xuY29uc3QgVElNRU9VVF9GQUNUT1IgPSAzOyAvLyB0aW1lb3V0cyBhZnRlciAzIGludGVydmFsc1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBIZWFydGJlYXRDb250cm9sbGVyIGV4dGVuZHMgSnNvbkNvbnRyb2xsZXIge1xuICBwcml2YXRlIGludGVydmFsVmFsdWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBwaW5nVGltZXI6IGFueTtcbiAgcHJpdmF0ZSB0aW1lb3V0OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoY2xpZW50OiBDbGllbnQsIHNvdXJjZUlkOiBzdHJpbmcsIGRlc3RpbmF0aW9uSWQ6IHN0cmluZykge1xuICAgIHN1cGVyKFxuICAgICAgY2xpZW50LFxuICAgICAgc291cmNlSWQsXG4gICAgICBkZXN0aW5hdGlvbklkLFxuICAgICAgJ3Vybjp4LWNhc3Q6Y29tLmdvb2dsZS5jYXN0LnRwLmhlYXJ0YmVhdCdcbiAgICApO1xuICAgIHRoaXMucGluZ1RpbWVyID0gbnVsbDtcbiAgICB0aGlzLnRpbWVvdXQgPSBudWxsO1xuICAgIHRoaXMuaW50ZXJ2YWxWYWx1ZSA9IERFRkFVTFRfSU5URVJWQUw7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgZnVuY3Rpb24gb25NZXNzYWdlKGRhdGE6IGFueSkge1xuICAgICAgaWYgKGRhdGEudHlwZSA9PT0gJ1BPTkcnKSBzZWxmLmVtaXQoJ3BvbmcnKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gb25DbG9zZSgpIHtcbiAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgICAgc2VsZi5zdG9wKCk7XG4gICAgfVxuICAgIHRoaXMub24oJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgIHRoaXMub25jZSgnY2xvc2UnLCBvbkNsb3NlKTtcbiAgfVxuXG4gIHBpbmcoKSB7XG4gICAgZGVidWcoJ1JlY2VpdmVkIGEgLnBpbmcoKSBiZWZvcmUgY2hlY2tpbmcgdGltZW91dCcpO1xuICAgIGlmICh0aGlzLnRpbWVvdXQpIHJldHVybjsgLy8gV2UgYWxyZWFkeSBoYXZlIGEgcGluZyBpbiBwcm9ncmVzcy5cbiAgICBkZWJ1ZygnV2UgZG8gbm90IGhhdmUgYSB0aW1lb3V0LCBzbyB3ZSBhcmUgY29udGludWluZycpO1xuICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5lbWl0KCd0aW1lb3V0Jyk7XG4gICAgfSwgdGhpcy5pbnRlcnZhbFZhbHVlICogMTAwMCAqIFRJTUVPVVRfRkFDVE9SKTtcblxuICAgIHRoaXMub25jZSgncG9uZycsICgpID0+IHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgdGhpcy50aW1lb3V0ID0gbnVsbDtcblxuICAgICAgdGhpcy5waW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5waW5nVGltZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnBpbmcoKTtcbiAgICAgIH0sIHRoaXMuaW50ZXJ2YWxWYWx1ZSAqIDEwMDApO1xuICAgIH0pO1xuXG4gICAgdGhpcy5zZW5kKHtcbiAgICAgIHR5cGU6ICdQSU5HJ1xuICAgIH0pO1xuICB9XG5cbiAgc3RhcnQoaW50ZXJ2YWxWYWx1ZT86IG51bWJlcikge1xuICAgIHRoaXMuaW50ZXJ2YWxWYWx1ZSA9IGludGVydmFsVmFsdWUgfHwgdGhpcy5pbnRlcnZhbFZhbHVlO1xuICAgIHRoaXMucGluZygpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5waW5nVGltZXIpIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lcik7XG4gICAgaWYgKHRoaXMudGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3BvbmcnKTtcbiAgfVxufVxuIl19