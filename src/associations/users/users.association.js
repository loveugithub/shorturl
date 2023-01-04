const Url = require("../../models/urls/urls.postgres.js");
const User = require("../../models/users/users.postgres.js");

// One-To-Many
User.hasMany(Url, {
  foreignKey: "userId",
  sourceKey: "id",
});

Url.belongsTo(User, {
  foreignKey: "userId",
  targetKey: "id",
});
