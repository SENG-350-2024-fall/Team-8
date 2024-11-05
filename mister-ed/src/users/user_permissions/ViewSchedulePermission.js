import UserPermissionDecorator from "./UserPermissionDecorator";

// View Schedule Permission - Allows user to see the schedule of the hospitol
class ViewSchedulePermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('view_schedule');
    }
}

export default ViewSchedulePermission;