module.exports = (sequelize, DataTypes) => {
    const Branch = sequelize.define("Branch", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      branch_code:{
        type: DataTypes.INTEGER,
      },
      name:{
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

    return Branch;
};