class User {
    constructor(name, email, password, age, postal) {
        this._name = name;
        this._email = email;
        this._password = password;
        this._age = age;
        this._postal = postal;
        this._permissions = [];
    }

    //Any Methods that are common amongst all the user types

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get age() {
        return this._age;
    }

    get postal() {
        return this._postal;
    }

    get permissions() {
        return this._permissions;
    }

    addPermission(permission) {
        this._permissions.push(permission);
    }
}

export default User;