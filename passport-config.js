const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport, getUserByEmail, getUserbyId) => {
  const authenticateUser = async (req, email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: 'No user with this email.' });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Password was not correct' });
      }
    } catch (error) {
      return done(error);
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
      authenticateUser
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserbyId(id));
  });
};
