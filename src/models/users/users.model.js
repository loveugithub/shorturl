const { Op } = require("sequelize");

const User = require("./users.postgres");

const createUser = async (data, transaction) => {
  return await User.create(data, { transaction });
};

const findUserByPk = async (pk, transaction) => {
  return await User.findByPk(pk, { transaction });
};

const findUserWithPassword = async (email, transaction) => {
  return await User.findOne({
    attributes: { include: ["password"] },
    where: { email },
    transaction,
  });
};

module.exports = { createUser, findUserByPk, findUserWithPassword };
