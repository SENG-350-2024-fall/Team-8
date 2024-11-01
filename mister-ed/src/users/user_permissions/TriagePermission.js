import UserPermissionDecorator from "./UserPermissionDecorator";

// Triage - Allows user to performs Triages
class TriagePermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('triage');
    }
}

export default TriagePermission;