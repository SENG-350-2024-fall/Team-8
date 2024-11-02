import ValidationHandler from './ValidationHandler';
import ValidationError from './ValidationError';

class RequiredFieldsValidation extends ValidationHandler {
  
    //Handling request
    handle(request) {
    const { email, password, name, age, postal } = request;
    if (!email || !password || !name || !age || !postal) {
      throw new ValidationError('Please fill in all the fields.');
    }
    return super.handle(request);
  }
}

export default RequiredFieldsValidation;
