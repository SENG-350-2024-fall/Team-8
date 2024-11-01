
//Decorator Class for the many different user permissions
class UserPermissionDecorator {
    constructor(user) {
        this.user = user;
    }

    get permissions() {
        return this.user.permissions;
    }

    addPermission(permission) {
       this.user.addPermission(permission);
    }
}

export default UserPermissionDecorator;