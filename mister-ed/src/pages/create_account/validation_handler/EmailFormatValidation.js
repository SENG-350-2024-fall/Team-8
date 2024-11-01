import ValidationHandler from './ValidationHandler';
import ValidationError from './ValidationError';

class EmailFormatValidation extends ValidationHandler {

    //Handling Request
    handle(request) {
        const { email } = request;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError('Invalid email format.');
        }
        return super.handle(request);
    }
}

export default EmailFormatValidation;
