import User from './User'

class Doctor extends User {
    constructor(name, email, password, age, postal) {
        super(name, email, password, age, postal)
        this.role = 'Doctor';
    }

    //Any methods specific to Doctor
}

export default Doctor;