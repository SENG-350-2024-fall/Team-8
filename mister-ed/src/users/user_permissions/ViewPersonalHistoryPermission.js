import UserPermissionDecorator from "./UserPermissionDecorator";

// View Personal History - Allows user to view their own history
class ViewPersonalHistoryPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('view_personal_history');
    }
}

export default ViewPersonalHistoryPermission;