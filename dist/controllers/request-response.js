"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _json = _interopRequireDefault(require("./json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RequestResponseController extends _json.default {
  constructor(client, sourceId, destinationId, namespace) {
    super(client, sourceId, destinationId, namespace);
    this.lastRequestId = void 0;
    this.lastRequestId = 0;
  }
  /**
   * Object to request
   * @param data - data
   */


  request(data) {
    return new Promise((resolve, reject) => {
      const requestId = ++this.lastRequestId;
      const self = this;

      function onMessage(response) {
        if (response.requestId === requestId) {
          self.removeListener('message', onMessage);

          if (response.type === 'INVALID_REQUEST') {
            return reject(new Error(`Invalid request: ${response.reason}`));
          }

          delete response.requestId;
          return resolve(response);
        }
      }

      this.on('message', onMessage);
      data.requestId = requestId;
      this.send(data);
    });
  }

}

exports.default = RequestResponseController;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbGVycy9yZXF1ZXN0LXJlc3BvbnNlLnRzIl0sIm5hbWVzIjpbIlJlcXVlc3RSZXNwb25zZUNvbnRyb2xsZXIiLCJKc29uQ29udHJvbGxlciIsImNvbnN0cnVjdG9yIiwiY2xpZW50Iiwic291cmNlSWQiLCJkZXN0aW5hdGlvbklkIiwibmFtZXNwYWNlIiwibGFzdFJlcXVlc3RJZCIsInJlcXVlc3QiLCJkYXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1ZXN0SWQiLCJzZWxmIiwib25NZXNzYWdlIiwicmVzcG9uc2UiLCJyZW1vdmVMaXN0ZW5lciIsInR5cGUiLCJFcnJvciIsInJlYXNvbiIsIm9uIiwic2VuZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOzs7O0FBR2UsTUFBTUEseUJBQU4sU0FBd0NDLGFBQXhDLENBQXVEO0FBR3BFQyxFQUFBQSxXQUFXLENBQ1RDLE1BRFMsRUFFVEMsUUFGUyxFQUdUQyxhQUhTLEVBSVRDLFNBSlMsRUFLVDtBQUNBLFVBQU1ILE1BQU4sRUFBY0MsUUFBZCxFQUF3QkMsYUFBeEIsRUFBdUNDLFNBQXZDO0FBREEsU0FQS0MsYUFPTDtBQUVBLFNBQUtBLGFBQUwsR0FBcUIsQ0FBckI7QUFDRDtBQUVEOzs7Ozs7QUFJQUMsRUFBQUEsT0FBTyxDQUFDQyxJQUFELEVBQStDO0FBQ3BELFdBQU8sSUFBSUMsT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVUMsTUFBVixLQUFxQjtBQUN0QyxZQUFNQyxTQUFTLEdBQUcsRUFBRSxLQUFLTixhQUF6QjtBQUNBLFlBQU1PLElBQUksR0FBRyxJQUFiOztBQUNBLGVBQVNDLFNBQVQsQ0FBbUJDLFFBQW5CLEVBQXVDO0FBQ3JDLFlBQUlBLFFBQVEsQ0FBQ0gsU0FBVCxLQUF1QkEsU0FBM0IsRUFBc0M7QUFDcENDLFVBQUFBLElBQUksQ0FBQ0csY0FBTCxDQUFvQixTQUFwQixFQUErQkYsU0FBL0I7O0FBQ0EsY0FBSUMsUUFBUSxDQUFDRSxJQUFULEtBQWtCLGlCQUF0QixFQUF5QztBQUN2QyxtQkFBT04sTUFBTSxDQUFDLElBQUlPLEtBQUosQ0FBVyxvQkFBbUJILFFBQVEsQ0FBQ0ksTUFBTyxFQUE5QyxDQUFELENBQWI7QUFDRDs7QUFDRCxpQkFBT0osUUFBUSxDQUFDSCxTQUFoQjtBQUNBLGlCQUFPRixPQUFPLENBQUNLLFFBQUQsQ0FBZDtBQUNEO0FBQ0Y7O0FBQ0QsV0FBS0ssRUFBTCxDQUFRLFNBQVIsRUFBbUJOLFNBQW5CO0FBQ0FOLE1BQUFBLElBQUksQ0FBQ0ksU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxXQUFLUyxJQUFMLENBQVViLElBQVY7QUFDRCxLQWhCTSxDQUFQO0FBaUJEOztBQW5DbUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDbGllbnQgfSBmcm9tICdjYXN0djInO1xuaW1wb3J0IEpzb25Db250cm9sbGVyIGZyb20gJy4vanNvbic7XG5cbnR5cGUgUmVzcG9uc2UgPSBhbnk7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZXF1ZXN0UmVzcG9uc2VDb250cm9sbGVyIGV4dGVuZHMgSnNvbkNvbnRyb2xsZXIge1xuICBwdWJsaWMgbGFzdFJlcXVlc3RJZDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNsaWVudDogQ2xpZW50LFxuICAgIHNvdXJjZUlkOiBzdHJpbmcsXG4gICAgZGVzdGluYXRpb25JZDogc3RyaW5nLFxuICAgIG5hbWVzcGFjZTogc3RyaW5nXG4gICkge1xuICAgIHN1cGVyKGNsaWVudCwgc291cmNlSWQsIGRlc3RpbmF0aW9uSWQsIG5hbWVzcGFjZSk7XG4gICAgdGhpcy5sYXN0UmVxdWVzdElkID0gMDtcbiAgfVxuXG4gIC8qKlxuICAgKiBPYmplY3QgdG8gcmVxdWVzdFxuICAgKiBAcGFyYW0gZGF0YSAtIGRhdGFcbiAgICovXG4gIHJlcXVlc3QoZGF0YTogUmVjb3JkPHN0cmluZywgYW55Pik6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgcmVxdWVzdElkID0gKyt0aGlzLmxhc3RSZXF1ZXN0SWQ7XG4gICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIG9uTWVzc2FnZShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnJlcXVlc3RJZCA9PT0gcmVxdWVzdElkKSB7XG4gICAgICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignbWVzc2FnZScsIG9uTWVzc2FnZSk7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnR5cGUgPT09ICdJTlZBTElEX1JFUVVFU1QnKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KG5ldyBFcnJvcihgSW52YWxpZCByZXF1ZXN0OiAke3Jlc3BvbnNlLnJlYXNvbn1gKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRlbGV0ZSByZXNwb25zZS5yZXF1ZXN0SWQ7XG4gICAgICAgICAgcmV0dXJuIHJlc29sdmUocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLm9uKCdtZXNzYWdlJywgb25NZXNzYWdlKTtcbiAgICAgIGRhdGEucmVxdWVzdElkID0gcmVxdWVzdElkO1xuICAgICAgdGhpcy5zZW5kKGRhdGEpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=