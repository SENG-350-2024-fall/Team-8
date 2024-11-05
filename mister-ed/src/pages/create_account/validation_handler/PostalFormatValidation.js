import ValidationHandler from './ValidationHandler';
import ValidationError from './ValidationError';

class PostalFormatValidation extends ValidationHandler {
  handle(accountData) {
    const postalRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/; // Match Canadian Postal Code
    if (!postalRegex.test(accountData.postal)) {
        throw new ValidationError("Invalid Postal Code.");
    }
    return super.handle(accountData); // Pass to the next handler in the chain
  }
}

export default PostalFormatValidation;
