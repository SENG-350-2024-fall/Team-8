import User from './User';
import Patient from './Patient';
import Nurse from './Nurse';
import Doctor from './Doctor';
import EMT from './EMT';
import Admin from './Admin';

import AdminPermission from './user_permissions/AdminPermission';
import BookAppointmentPermission from './user_permissions/BookAppointmentPermission';
import CreateTicketPermission from './user_permissions/CreateTicketPermission';
import DispatchPermission from './user_permissions/DispatchPermission';
import RequestTriagePermission from './user_permissions/RequestTriagePermission';
import RequestDispatchPermission from './user_permissions/RequestDispatchPermission';
import TriagePermission from './user_permissions/TriagePermission';
import ViewAllHistoryPermission from './user_permissions/ViewAllHistoryPermission';
import ViewPersonalHistoryPermission from './user_permissions/ViewPersonalHistoryPermission';
import ViewSchedulePermission from './user_permissions/ViewSchedulePermission';

class UserFactory {
    static createUser(role, name, email, password, age, postal) {
        let user;

        switch (role) {
            case 'Patient':
                user = new Patient(name, email, password, age, postal);
                user = new CreateTicketPermission(user);
                user = new RequestTriagePermission(user);
                user = new ViewPersonalHistoryPermission(user);
                break;
            case 'Nurse':
                user = new Nurse(name, email, password, age, postal);
                user = new BookAppointmentPermission(user);
                user = new CreateTicketPermission(user);
                user = new RequestDispatchPermission(user);
                user = new TriagePermission(user);
                user = new ViewAllHistoryPermission(user);
                user = new ViewSchedulePermission(user);
                break;
            case 'Doctor':
                user = new Doctor(name, email, password, age, postal);
                user = new CreateTicketPermission(user);
                user = new ViewAllHistoryPermission(user);
                user = new ViewSchedulePermission(user);
                break;
            case 'EMT':
                user = new EMT(name, email, password, age, postal);
                user = new CreateTicketPermission(user);
                user = new DispatchPermission(user);
                break;
            case 'Admin':
                user = new Patient(name, email, password, age, postal);
                user = new AdminPermission(user);
                break;
            default:
                throw new Error(`Invalid role: ${role}`);
        }

        return user;
    }
}

export default UserFactory;
