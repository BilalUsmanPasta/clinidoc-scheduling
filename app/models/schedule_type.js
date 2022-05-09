module.exports = (sequelize, DataTypes) => {
    const Schedule_Type = sequelize.define("Schedule_Type", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
        },
        can_book: {
            type: DataTypes.BOOLEAN,
        },
        code: {
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

    return Schedule_Type;
};