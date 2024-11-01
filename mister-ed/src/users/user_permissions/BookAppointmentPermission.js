import UserPermissionDecorator from "./UserPermissionDecorator";

// Book Appointment Permission - Allows user to book appointments for a hospitol
class BookAppointmentPermission extends UserPermissionDecorator {
    constructor(user) {
        super(user);
        this.addPermission('book_appointments');
    }
}

export default BookAppointmentPermission;