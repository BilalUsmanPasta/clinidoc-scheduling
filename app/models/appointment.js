
module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      
        patient_id: {
            type: DataTypes.INTEGER,
        },

        event_notes: {
            type: DataTypes.STRING,
        },
        patient_notes: {
            type: DataTypes.STRING,
        },

        type: {
            type: DataTypes.STRING,
        },
        waiting: {
            type: DataTypes.BOOLEAN,
        },
        is_completed: {
            type: DataTypes.BOOLEAN,
            default: 0,
        },
        schedule_id: {
            type: DataTypes.INTEGER,
        },
        row_state_id: {
            type: DataTypes.INTEGER,
        },
        row_version: {
            type: DataTypes.INTEGER,
        },
        created_by: {
            type: DataTypes.INTEGER,
        },
        modified_by: {
            type: DataTypes.INTEGER,
        },
    });


    Appointments.associate = function(models) {
        Appointments.belongsTo(models.Schedules, {foreignKey: 'schedule_id'})
        Appointments.belongsTo(models.Patients, {foreignKey: 'patient_id'})

      };


    return Appointments;
};