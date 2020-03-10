/**  
Subclass of Error object 
 * ErrorResponse is made an instance of Error via super with access to message property
 * Adds a statusCode property
*/
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
