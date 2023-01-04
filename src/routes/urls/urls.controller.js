const { sequelize } = require("../../services/postgres");
const {
  createUrl,
  findUrlByUrlString,
  findAllUrls,
} = require("../../models/urls/urls.model");

const addUrl = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const bodyData = { ...req.body, userId: req.user.id };
    const url = await createUrl(bodyData, t);
    await t.commit();

    res.status(201).json({
      status: "success",
      data: {
        url,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const getUrlByUrlString = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { urlString } = req.query;
    const url = await findAUrl(urlString, t);
    if (!url) {
      return res.status(404).json({
        status: "fail",
        msg: "Not Found!",
      });
    }
    await t.commit();

    res.status(200).json({
      status: "success",
      data: {
        url,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const getUrls = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { urlString } = req.query;
    const filter = { userId: req.user.id };
    if (urlString) filter.urlString = urlString;

    const urls = await findAllUrls(filter, t);
    await t.commit();
    res.status(200).json({
      status: "success",
      length: urls.length,
      data: {
        urls,
      },
    });
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

const goToUrl = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const { urlString } = req.params;
    const url = await findUrlByUrlString(urlString, t);
    if (!url) {
      return res.redirect("/api/v1");
    }
    await t.commit();

    res.redirect(`${url.originString}`);
  } catch (err) {
    await t.rollback();
    console.log("getting error...");
    console.error(err);
    res.status(400).json({
      error: err,
    });
  }
};

module.exports = { addUrl, getUrls, getUrlByUrlString, goToUrl };
