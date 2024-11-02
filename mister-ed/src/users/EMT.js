import User from './User'

class EMT extends User {
    constructor(name, email, password, age, postal) {
        super(name, email, password, age, postal)
        this.role = 'EMT';
    }

    //Any methods specific to EMT
}

export default EMT;