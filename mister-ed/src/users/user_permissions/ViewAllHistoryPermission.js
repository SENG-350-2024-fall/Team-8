import UserPermissionDecorator from "./UserPermissionDecorator";

// View All Patient Histories - Allows user to view history of all patients
class ViewAllHistoryPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('view_all_patient_histories');
    }
}

export default ViewAllHistoryPermission;