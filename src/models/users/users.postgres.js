const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const { DataTypes } = require("sequelize");
const { sequelize } = require("../../services/postgres");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter name!",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        toLower(value) {
          this.email = value.toLowerCase();
        },
        notNull: {
          msg: "Please enter email!",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/i,
      },
    },
    passwordConfirm: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        checkPassword(value) {
          if (value !== this.password) {
            throw new Error(`Password and passwordConfirm didn't match`);
          } else {
            this.passwordConfirm = null;
          }
        },
        len: {
          args: [5, 10],
          msg: "Password length must be greater than 4 and less than 11",
        },
      },
    },
  },
  {
    defaultScope: {
      attributes: {
        exclude: ["password"],
      },
    },
  }
);

User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 12);
  }
});

User.prototype.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = User;
