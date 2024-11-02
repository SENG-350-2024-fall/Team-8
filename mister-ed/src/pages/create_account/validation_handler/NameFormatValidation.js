import ValidationHandler from './ValidationHandler';
import ValidationError from './ValidationError';

class NameFormatValidation extends ValidationHandler {

    //Handling Request
    handle(accountData) {
        const nameParts = accountData.name.trim().split(' ');
        if (nameParts.length < 2) {
            throw new ValidationError("Please enter both a first and last name.");
        }
        return super.handle(accountData); // Pass to the next handler in the chain
    }
}

export default NameFormatValidation;