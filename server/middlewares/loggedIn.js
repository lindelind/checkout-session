const loggedIn = (req, res, next) => {
  console.log("Session:", req.session);
  if (!req.session.customer) {
    return res.status(401).json("You are not logged in");
  }
  next();
};
module.exports = { loggedIn };
