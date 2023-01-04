const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");

const { findUserByPk } = require("../models/users/users.model");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new Strategy(opts, async function (jwtPayload, done) {
    try {
      const user = await findUserByPk(jwtPayload.id);
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  })
);
