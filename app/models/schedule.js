module.exports = (sequelize, DataTypes) => {
    const Schedules = sequelize.define("Schedules", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        booked: {
            type: DataTypes.BOOLEAN,
        },

        end_time: {
            type: DataTypes.DATE
        },
        start_time: {
            type: DataTypes.DATE,
        },
        schedule_type_id: {
            type: DataTypes.INTEGER,
        },

        practitioner_id: {
            type: DataTypes.INTEGER,
        },
        Date: {
            type: DataTypes.DATE,
        },
        room_id: {
            type: DataTypes.INTEGER,
        },
        task:{
            type: DataTypes.STRING,
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

  Schedules.associate = function(models) {
        Schedules.belongsTo(models.Practitioners, {foreignKey: 'practitioner_id'})
        Schedules.belongsTo(models.Room,{foreignKey: 'room_id'})
        Schedules.belongsTo(models.Schedule_Type,{foreignKey: 'schedule_type_id'})

        // Appointments.belongsTo(models.Patients, {foreignKey: 'patient_id'})

      };

    return Schedules;
};