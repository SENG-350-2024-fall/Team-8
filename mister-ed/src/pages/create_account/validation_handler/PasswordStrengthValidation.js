import ValidationHandler from './ValidationHandler';
import ValidationError from './ValidationError';

class PasswordStrengthValidation extends ValidationHandler {

    //Handling Request
    handle(request) {
        const { password } = request;
        if (password.length < 8) {
            throw new ValidationError('Password must be at least 8 characters long.');
        }
        return super.handle(request);
    }
}

export default PasswordStrengthValidation;
