import User from './User'

class Patient extends User {
    constructor(name, email, password, age, postal) {
        super(name, email, password, age, postal)
        this.role = 'Patient';
    }

    //Any methods specific to Patient
}

export default Patient;