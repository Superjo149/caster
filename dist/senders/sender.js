"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

class Sender extends _events.EventEmitter {
  constructor(client, senderId, receiverId) {
    super();
    this.client = void 0;
    this.senderId = void 0;
    this.receiverId = void 0;
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


  createController(Controller, ...args) {
    if (!this.client || !this.senderId || !this.receiverId) {
      throw new Error("Client may be closed");
    }

    return new Controller(this.client, this.senderId, this.receiverId, ...args);
  }

}

exports.default = Sender;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZW5kZXJzL3NlbmRlci50cyJdLCJuYW1lcyI6WyJTZW5kZXIiLCJFdmVudEVtaXR0ZXIiLCJjb25zdHJ1Y3RvciIsImNsaWVudCIsInNlbmRlcklkIiwicmVjZWl2ZXJJZCIsImNsb3NlIiwidW5kZWZpbmVkIiwiY3JlYXRlQ29udHJvbGxlciIsIkNvbnRyb2xsZXIiLCJhcmdzIiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDQTs7QUFFZSxNQUFNQSxNQUFOLFNBQXFCQyxvQkFBckIsQ0FBa0M7QUFLL0NDLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFpQkMsUUFBakIsRUFBbUNDLFVBQW5DLEVBQXVEO0FBQ2hFO0FBRGdFLFNBSmxFRixNQUlrRTtBQUFBLFNBSGxFQyxRQUdrRTtBQUFBLFNBRmxFQyxVQUVrRTtBQUVoRSxTQUFLRixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0Q7QUFFRDs7Ozs7QUFHQUMsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS0YsUUFBTCxHQUFnQkcsU0FBaEI7QUFDQSxTQUFLRixVQUFMLEdBQWtCRSxTQUFsQjtBQUNBLFNBQUtKLE1BQUwsR0FBY0ksU0FBZDtBQUNEO0FBRUQ7Ozs7Ozs7QUFLQUMsRUFBQUEsZ0JBQWdCLENBQWdCQyxVQUFoQixFQUF5RCxHQUFHQyxJQUE1RCxFQUE0RTtBQUMxRixRQUFJLENBQUMsS0FBS1AsTUFBTixJQUFnQixDQUFDLEtBQUtDLFFBQXRCLElBQWtDLENBQUMsS0FBS0MsVUFBNUMsRUFBd0Q7QUFDdEQsWUFBTSxJQUFJTSxLQUFKLENBQVUsc0JBQVYsQ0FBTjtBQUNEOztBQUVELFdBQU8sSUFBSUYsVUFBSixDQUFlLEtBQUtOLE1BQXBCLEVBQTRCLEtBQUtDLFFBQWpDLEVBQTJDLEtBQUtDLFVBQWhELEVBQTRELEdBQUdLLElBQS9ELENBQVA7QUFDRDs7QUFoQzhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2xpZW50IH0gZnJvbSAnY2FzdHYyJztcbmltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlbmRlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIGNsaWVudD86IENsaWVudDtcbiAgc2VuZGVySWQ/OiBzdHJpbmc7XG4gIHJlY2VpdmVySWQ/OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoY2xpZW50OiBDbGllbnQsIHNlbmRlcklkOiBzdHJpbmcsIHJlY2VpdmVySWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5jbGllbnQgPSBjbGllbnQ7XG4gICAgdGhpcy5zZW5kZXJJZCA9IHNlbmRlcklkO1xuICAgIHRoaXMucmVjZWl2ZXJJZCA9IHJlY2VpdmVySWQ7XG4gIH1cblxuICAvKipcbiAgICogQ2xvc2UgdGhlIFNlbmRlclxuICAgKi9cbiAgY2xvc2UoKSB7XG4gICAgdGhpcy5zZW5kZXJJZCA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnJlY2VpdmVySWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jbGllbnQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGEgY29udHJvbGxlciB1c2luZyB0aGUgU2VuZGVyJ3MgcHJvcGVydGllc1xuICAgKiBAcGFyYW0ge0NvbnRyb2xsZXJ9IGNvbnRyb2xsZXJcbiAgICogQHBhcmFtIHsqfSBhcmdzXG4gICAqL1xuICBjcmVhdGVDb250cm9sbGVyPFQgZXh0ZW5kcyBhbnk+KENvbnRyb2xsZXI6IHsgbmV3KC4uLmFyZ3M6IGFueVtdKTogVDsgfSwgLi4uYXJnczogYW55W10pOiBUIHtcbiAgICBpZiAoIXRoaXMuY2xpZW50IHx8ICF0aGlzLnNlbmRlcklkIHx8ICF0aGlzLnJlY2VpdmVySWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNsaWVudCBtYXkgYmUgY2xvc2VkXCIpXG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBDb250cm9sbGVyKHRoaXMuY2xpZW50LCB0aGlzLnNlbmRlcklkLCB0aGlzLnJlY2VpdmVySWQsIC4uLmFyZ3MpO1xuICB9XG59XG4iXX0=