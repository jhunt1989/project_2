module.exports = function (sequelize, DataTypes) {
    var Supervisor = sequelize.define("Supervisor", {
        supervisor_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        }, 
        jobs_expenses: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        jobs_revenue: {
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
    return Supervisor;
}