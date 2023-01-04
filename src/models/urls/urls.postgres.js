const { DataTypes } = require("sequelize");
const { sequelize } = require("../../services/postgres");

const Url = sequelize.define("Url", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  urlString: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Please enter url!",
      },
    },
  },
  originString: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Please enter original url!",
      },
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

module.exports = Url;
