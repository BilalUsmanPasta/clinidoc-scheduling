module.exports = (sequelize, DataTypes) => {
    const Appointment_type = sequelize.define("Appointment_type", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.INTEGER,
        },
        label: {
            type: DataTypes.INTEGER,
        },
        urgency_level: {
            type: DataTypes.INTEGER,
        },
        created_by: {
            type: DataTypes.INTEGER,
        },
        modified_by: {
            type: DataTypes.INTEGER,
        },
        row_version: {
            type: DataTypes.INTEGER,
        },
        row_state_id: {
            type: DataTypes.INTEGER,
        }
    });

    return Appointment_type;
};