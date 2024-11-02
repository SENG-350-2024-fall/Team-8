import UserFactory from '../UserFactory';

describe('createUser method with good data', () => {
    const name = 'Bob';
    const email = 'Email@mail.com';
    const password = 'Password123';
    const age = 20;
    const postal = 'X2V 2T0';

    test('Create a new patient', () => {
        const patient = UserFactory.createUser(
            'Patient',
            name,
            email,
            password,
            age,
            postal
        );

        expect(patient.permissions).toContain('create_support_ticket');
        expect(patient.permissions).toContain('request_triage');
        expect(patient.permissions).toContain('view_personal_history');

        expect(patient.name).toBe(name);
        expect(patient.email).toBe(email);
        expect(patient.age).toBe(age);
        expect(patient.postal).toBe(postal);
    });
});
