import UserPermissionDecorator from "./UserPermissionDecorator";

// Request Dispatch Permission - Allows user to request dispatch requests
class RequestDispatchPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('request_dispatch');
    }
}

export default RequestDispatchPermission;