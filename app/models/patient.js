module.exports = (sequelize, DataTypes) => {
    const Patients = sequelize.define("Patients", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        referral_id: {
            type: DataTypes.INTEGER,
        },
        patient_name: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.STRING,
        },
        legal_gardian: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        marital_status: {
            type: DataTypes.STRING,
        },
        race: {
            type: DataTypes.STRING,
        },
        reason_for_contact: {
            type: DataTypes.STRING,
        },
        insurance_name: {
            type: DataTypes.STRING,
        },
        insurance_member_id: {
            type: DataTypes.STRING,
        },
        insurance_group: {
            type: DataTypes.STRING,
        },
        relationship_to_insured: {
            type: DataTypes.STRING,
        },
        insured_ssn: {
            type: DataTypes.STRING,
        },
        ssn: {
            type: DataTypes.STRING,
        },
        emergency_name: {
            type: DataTypes.STRING,
        },
        emergency_phone: {
            type: DataTypes.STRING,
        },
        emergency_relationship: {
            type: DataTypes.STRING,
        },
        insured_person: {
            type: DataTypes.STRING,
        },
        gender: {
            type: DataTypes.STRING,
        },
        insured_dob: {
            type: DataTypes.DATE,
        },
        insurance_phone: {
            type: DataTypes.STRING,
        },
        status_id: {
            type: DataTypes.INTEGER,
        },
        consentForm: {
            type: DataTypes.STRING,
        },
        first_name: {
            type: DataTypes.STRING,
        },
        middle_name: {
            type: DataTypes.STRING,
        },
        last_name: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        ethnicity: {
            type: DataTypes.STRING,
        },
        other_ethnicity: {
            type: DataTypes.STRING,
        },
        disability: {
            type: DataTypes.STRING,
        },
        employment_status: {
            type: DataTypes.STRING,
        },
        religion: {
            type: DataTypes.STRING,
        },
        birth_order: {
            type: DataTypes.INTEGER,
        },
        family_size: {
            type: DataTypes.INTEGER,
        },
        alt_address: {
            type: DataTypes.STRING,
        },
        maiden: {
            type: DataTypes.STRING,
        },
        preferred_language: {
            type: DataTypes.STRING,
        },
        other_email: {
            type: DataTypes.STRING,
        },
        sexual_orientation: {
            type: DataTypes.STRING,
        },
        veteren: {
            type: DataTypes.BOOLEAN,
        },
        multiple_birth: {
            type: DataTypes.BOOLEAN,
        },
        native_american: {
            type: DataTypes.BOOLEAN,
        },
        patient_notes: {
            type: DataTypes.STRING,
        },
        mis_notes: {
            type: DataTypes.STRING,
        },
        number_of_siblings: {
            type: DataTypes.INTEGER,
        },
        any_medication: {
            type: DataTypes.BOOLEAN,
        },
        any_allergies: {
            type: DataTypes.BOOLEAN,
        },
        using_tabboco: {
            type: DataTypes.BOOLEAN,
        },
        using_illegal_drugs: {
            type: DataTypes.BOOLEAN,
        },
        diagnosed_covid: {
            type: DataTypes.BOOLEAN,
        },
        using_alcohol: {
            type: DataTypes.BOOLEAN,
        },
        family_doctor: {
            type: DataTypes.STRING,
        },
        family_doctor_number: {
            type: DataTypes.STRING,
        },
        alt_city:{
            type: DataTypes.STRING,

        },
        alt_state:{
            type: DataTypes.STRING,

        },
        city:{
            type: DataTypes.STRING,

        },
        alt_street:{
            type: DataTypes.STRING,

        },
        insured_provider_city:{
            type: DataTypes.STRING,

        },
        insured_provider_state:{
            type: DataTypes.STRING,

        },

        created_by: {
            type: DataTypes.INTEGER,
        },
        modified_by: {
            type: DataTypes.INTEGER,
        },
        row_version: {
            type: DataTypes.STRING,
        },
        row_state_id: {
            type: DataTypes.STRING,
        }
    });

    return Patients;
};