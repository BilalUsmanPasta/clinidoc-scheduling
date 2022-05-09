module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define("Room", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      room_no:{
        type: DataTypes.INTEGER,
      },
      branch_code:{
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

    return Room;
};