'use strict';
const { isAfter } = require('date-fns');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate (models) {
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  Task.init(
    {
      content: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'is_done',
        validate: {
          notNull: true,
        },
        defaultValue: false,
      },
      deadLine: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'dead_line',
        validate: {
          isDate: true,
          isValidDate (value) {
            if (isAfter(new Date(), new Date(value))) {
              throw new Error('Fail! Check your dead line!');
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      underscored: true,
    }
  );
  return Task;
};
