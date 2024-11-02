import ValidationHandler from './ValidationHandler';
import ValidationError from './ValidationError';

class AgeValidation extends ValidationHandler {
  handle(accountData) {
    if (accountData.age < 18) {
      throw new ValidationError("Age must be above 18.");
    }
    return super.handle(accountData); // Pass to the next handler in the chain
  }
}

export default AgeValidation;