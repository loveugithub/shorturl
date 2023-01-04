const express = require("express");
require("./middlewares/passport-config");

const { goToUrl } = require("./routes/urls/urls.controller");
const api = require("./routes/api");

const app = express();

app.use(express.json());

app.get("/:urlString", goToUrl);
app.use("/api/v1", api);

module.exports = app;

// app.get("/url", (req, res, next) => {
//   res.redirect("https://nodejs.org/docs/latest-v16.x/api/errors.html");
// });
