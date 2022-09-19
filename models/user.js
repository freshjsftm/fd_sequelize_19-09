"use strict";
const { isAfter } = require("date-fns");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model { //User -> Users -> users
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(64),
        field: "first_name",
        allowNull: false,
        validate:{
          notNull: true,
          notEmpty: true,
        }
      },
      lastName:{
        type: DataTypes.STRING(64),
        field: "last_name",
        allowNull: false,
        validate:{
          notNull: true,
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true,
        validate:{
          notNull: true,
          notEmpty: true,
          isEmail: true,
        }
      },
      password: {
        field:'password_hash',
        type:DataTypes.TEXT,
        allowNull:false,
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull:false,
        validate:{
          isDate: true,
          isValidDate(value) {
            if (isAfter(new Date(value), new Date())) {
              throw new Error('Fail! Check your birthday!');
            }
          }
        }
      },
      isMale:{ 
        field:'is_male',
        type: DataTypes.BOOLEAN,
        allowNull:false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: 'users',
      underscored: true
    }
  );
  return User;
};
