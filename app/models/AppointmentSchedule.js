
module.exports = (sequelize, DataTypes) => {
    const AppointmentSchedule = sequelize.define("AppointmentSchedule", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      
        appointment_id: {
            type: DataTypes.INTEGER,
        },
        schedule_id: {
            type: DataTypes.INTEGER,
        },        
        reschedule_id: {
            type: DataTypes.INTEGER,
        },        
        waiting: {
            type: DataTypes.BOOLEAN,
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


    AppointmentSchedule.associate = function(models) {
        AppointmentSchedule.belongsTo(models.Schedules, {foreignKey: 'schedule_id'})
        AppointmentSchedule.belongsTo(models.Appointments, {foreignKey: 'appointment_id'})

      };


    return AppointmentSchedule;
};