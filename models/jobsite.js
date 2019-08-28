module.exports = function (sequelize, DataTypes) {
    var Jobsite = sequelize.define("Jobsite", {
        jobsite_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        }, 
        location_expenses: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        location_revenue: {
            type: DataTypes.INTEGER,
            allowNull: true
        } ,
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