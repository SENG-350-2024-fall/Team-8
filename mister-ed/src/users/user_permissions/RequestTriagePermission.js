import UserPermissionDecorator from "./UserPermissionDecorator";

// Request Triage - Allows user to request triage
class RequestTriagePermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('request_triage');
    }
}

export default RequestTriagePermission;