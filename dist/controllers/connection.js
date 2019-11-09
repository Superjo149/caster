"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ConnectionController extends _json.default {
  constructor(client, sourceId, destinationId) {
    super(client, sourceId, destinationId, 'urn:x-cast:com.google.cast.tp.connection');

    const onMessage = data => {
      if (data.type === 'CLOSE') this.emit('disconnect');
    };

    const onClose = () => {
      this.removeListener('message', onMessage);
    };

    this.on('message', onMessage);
    this.once('close', onClose);
  }
  /**
   * Connect
   */


  connect() {
    this.send({
      type: 'CONNECT'
    });
  }
  /**
   * Disconnect
   */


  disconnect() {
    this.send({
      type: 'CLOSE'
    });
  }

}

exports.default = ConnectionController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9jb25uZWN0aW9uLnRzIl0sIm5hbWVzIjpbIkNvbm5lY3Rpb25Db250cm9sbGVyIiwiSnNvbkNvbnRyb2xsZXIiLCJjb25zdHJ1Y3RvciIsImNsaWVudCIsInNvdXJjZUlkIiwiZGVzdGluYXRpb25JZCIsIm9uTWVzc2FnZSIsImRhdGEiLCJ0eXBlIiwiZW1pdCIsIm9uQ2xvc2UiLCJyZW1vdmVMaXN0ZW5lciIsIm9uIiwib25jZSIsImNvbm5lY3QiLCJzZW5kIiwiZGlzY29ubmVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBRWUsTUFBTUEsb0JBQU4sU0FBbUNDLGFBQW5DLENBQWtEO0FBQy9EQyxFQUFBQSxXQUFXLENBQUNDLE1BQUQsRUFBaUJDLFFBQWpCLEVBQW1DQyxhQUFuQyxFQUEwRDtBQUNuRSxVQUNFRixNQURGLEVBRUVDLFFBRkYsRUFHRUMsYUFIRixFQUlFLDBDQUpGOztBQU1BLFVBQU1DLFNBQVMsR0FBSUMsSUFBRCxJQUE0QjtBQUM1QyxVQUFJQSxJQUFJLENBQUNDLElBQUwsS0FBYyxPQUFsQixFQUEyQixLQUFLQyxJQUFMLENBQVUsWUFBVjtBQUM1QixLQUZEOztBQUdBLFVBQU1DLE9BQU8sR0FBRyxNQUFNO0FBQ3BCLFdBQUtDLGNBQUwsQ0FBb0IsU0FBcEIsRUFBK0JMLFNBQS9CO0FBQ0QsS0FGRDs7QUFHQSxTQUFLTSxFQUFMLENBQVEsU0FBUixFQUFtQk4sU0FBbkI7QUFDQSxTQUFLTyxJQUFMLENBQVUsT0FBVixFQUFtQkgsT0FBbkI7QUFDRDtBQUVEOzs7OztBQUdBSSxFQUFBQSxPQUFPLEdBQUc7QUFDUixTQUFLQyxJQUFMLENBQVU7QUFDUlAsTUFBQUEsSUFBSSxFQUFFO0FBREUsS0FBVjtBQUdEO0FBRUQ7Ozs7O0FBR0FRLEVBQUFBLFVBQVUsR0FBRztBQUNYLFNBQUtELElBQUwsQ0FBVTtBQUNSUCxNQUFBQSxJQUFJLEVBQUU7QUFERSxLQUFWO0FBR0Q7O0FBbEM4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENsaWVudCB9IGZyb20gJ2Nhc3R2Mic7XG5pbXBvcnQgSnNvbkNvbnRyb2xsZXIgZnJvbSAnLi9qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29ubmVjdGlvbkNvbnRyb2xsZXIgZXh0ZW5kcyBKc29uQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudDogQ2xpZW50LCBzb3VyY2VJZDogc3RyaW5nLCBkZXN0aW5hdGlvbklkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihcbiAgICAgIGNsaWVudCxcbiAgICAgIHNvdXJjZUlkLFxuICAgICAgZGVzdGluYXRpb25JZCxcbiAgICAgICd1cm46eC1jYXN0OmNvbS5nb29nbGUuY2FzdC50cC5jb25uZWN0aW9uJ1xuICAgICk7XG4gICAgY29uc3Qgb25NZXNzYWdlID0gKGRhdGE6IHsgdHlwZTogc3RyaW5nIH0pID0+IHtcbiAgICAgIGlmIChkYXRhLnR5cGUgPT09ICdDTE9TRScpIHRoaXMuZW1pdCgnZGlzY29ubmVjdCcpO1xuICAgIH07XG4gICAgY29uc3Qgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1lc3NhZ2UpO1xuICAgIH07XG4gICAgdGhpcy5vbignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgdGhpcy5vbmNlKCdjbG9zZScsIG9uQ2xvc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbm5lY3RcbiAgICovXG4gIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5zZW5kKHtcbiAgICAgIHR5cGU6ICdDT05ORUNUJ1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RcbiAgICovXG4gIGRpc2Nvbm5lY3QoKSB7XG4gICAgdGhpcy5zZW5kKHtcbiAgICAgIHR5cGU6ICdDTE9TRSdcbiAgICB9KTtcbiAgfVxufVxuIl19