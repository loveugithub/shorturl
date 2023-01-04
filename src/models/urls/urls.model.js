const { Op } = require("sequelize");
const Url = require("./urls.postgres");

const createUrl = async (data, transaction) => {
  return await Url.create(data, { transaction });
};

const findAllUrls = async (filter, transaction) => {
  return await Url.findAll({ where: filter, transaction });
};

const findUrlByUrlString = async (urlString, transaction) => {
  return await Url.findOne({ where: { urlString }, transaction });
};

module.exports = { createUrl, findUrlByUrlString, findAllUrls };
