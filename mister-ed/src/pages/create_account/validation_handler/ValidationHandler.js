class ValidationHandler {

    //Next Validation Handler
    setNext(handler) {
      this.nextHandler = handler;
      return handler;
    }
  
    //Handle the Current Request
    handle(request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return true; // If no more handlers, return true (validation passed)
    }
}
  
export default ValidationHandler;