const { sequelize } = require("../../services/postgres");
const { findUserByPk } = require("../../models/users/users.model");

const getMe = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const pk = req.user.id;
    const user = await findUserByPk(pk, t);

    await t.commit();

    res.status(200).json({
      status: "success",
      data: {
        user,
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

module.exports = { getMe };
