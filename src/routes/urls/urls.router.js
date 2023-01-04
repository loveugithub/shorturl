const express = require("express");
const passport = require("passport");

const { addUrl, getUrls, goToUrl } = require("./urls.controller.js");

const urlRouter = express.Router();

// protected
urlRouter.use(passport.authenticate("jwt", { session: false }));
urlRouter.get("/", getUrls);
urlRouter.post("/", addUrl);

module.exports = urlRouter;
