import User from './User'

class Admin extends User {
    constructor(name, email, password, age, postal) {
        super(name, email, password, age, postal)
        this.role = 'Admin';
    }

    //Any methods specific to Admin
}

export default Admin;