
module.exports = (sequelize, DataTypes) => {
    const Practitioners = sequelize.define("Practitioners", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      
        department_id: {
            type: DataTypes.INTEGER,
        },

        name: {
            type: DataTypes.STRING,
        },
        contact: {
            type: DataTypes.STRING,
        },

        profile_id: {
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
    }, {
        tableName: 'Practitioners'
      });


      Practitioners.associate = function(models) {
        Practitioners.belongsTo(models.Profile, {foreignKey: 'profile_id'})
      };


    return Practitioners;
};