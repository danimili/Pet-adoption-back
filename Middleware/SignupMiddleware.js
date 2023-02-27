const { getUsersByEmailModel } = require('../models/UsersModels');
const bcrypt = require("bcrypt");

const doPasswordsMatch = (req, res, next) => {
  const { userPassword, userRepassword } = req.body;
  if (userPassword !== userRepassword) {
    res.status(400).send('passwords dont match')
    return;
  }
  next();
};

const isNewUser = async (req, res, next) => {
  const user = await getUsersByEmailModel(req.body.userEmail);
  if (user) {
    res.status(400).send('User already exists');
    return;
  }
  next();
}

const hashPassword = (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.userPassword, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    req.body.userPassword = hash;
    next();
  });
}

module.exports = { doPasswordsMatch, isNewUser, hashPassword }