module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define("Profile", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
        },

        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING,
        },
        profile_type_id: {
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

    return Profile;
};