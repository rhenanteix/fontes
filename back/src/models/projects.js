'use strict';

module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define('projects', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        cost: DataTypes.DECIMAL(30, 2),
        done: DataTypes.BOOLEAN,
        deadline: DataTypes.DATE,
    }, {
        timestamps: true
    });

    return Projects;
}