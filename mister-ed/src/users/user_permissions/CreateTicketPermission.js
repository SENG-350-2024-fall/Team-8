import UserPermissionDecorator from "./UserPermissionDecorator";

// Create Support Ticket - Allows user to create support tickets
class CreateTicketPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('create_support_ticket');
    }
}

export default CreateTicketPermission;