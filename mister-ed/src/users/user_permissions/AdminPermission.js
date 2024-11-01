import UserPermissionDecorator from "./UserPermissionDecorator";

// Admin - Allows user admin priviledges
class AdminPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('admin');
    }
}

export default AdminPermission;