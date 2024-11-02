
//Decorator Class for the many different user permissions
class UserPermissionDecorator {
    constructor(user) {
        this.user = user;
    }

    get name() {
        return this.user.name;
    }

    get email() {
        return this.user.email;
    }

    get age() {
        return this.user.age;
    }

    get postal() {
        return this.user.postal;
    }

    get permissions() {
        return this.user.permissions;
    }

    addPermission(permission) {
       this.user.addPermission(permission);
    }
}

export default UserPermissionDecorator;