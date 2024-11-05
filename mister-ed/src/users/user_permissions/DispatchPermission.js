import UserPermissionDecorator from "./UserPermissionDecorator";

// Dispatch - Allows user to work with dispatch requests
class DispatchPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('dispatch');
    }
}

export default DispatchPermission;