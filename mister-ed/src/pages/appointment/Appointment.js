class Appointment {
    constructor(patientID, doctorID, time, notes) {
        this._patientID = patientID;
        this._doctorID = doctorID;
        this._time = time;
        this._notes = notes;
    }
    get patientID() {
        return this._patientID;
    }

    get doctorID() {
        return this._doctorID;
    }

    get time() {
        return this._time;
    }

    set time(new_time) {
        this._time = new_time;
    }

    get notes() {
        return this._notes;
    }

    set notes(new_notes) {
        this._notes = new_notes;
    }

    toJSON() {
        return {
            patientID: this._patientID,
            doctorID: this._doctorID,
            time: this._time,
            notes: this._notes,
        };
    }
}

export default Appointment;
