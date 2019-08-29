module.exports = function (sequelize, DataTypes) {
    var Jobsite = sequelize.define("Jobsite", {
        jobsite_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        primary_contact: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location_expenses: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        location_revenue: {
            type: DataTypes.INTEGER,
            allowNull: true
        } ,
        location_profits: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        },
        updatedAt: {
            type: DataTypes.DATE(3),
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3)')
        }
    });
    return Jobsite;
}