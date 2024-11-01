import User from './User'

class Nurse extends User {
    constructor(name, email, password, age, postal) {
        super(name, email, password, age, postal)
        this.role = 'Nurse';
    }

    //Any methods specific to Nurse
}

export default Nurse;