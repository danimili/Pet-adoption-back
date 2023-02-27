const { getUsersByEmailModel, getUsersByPasswordModel } = require('../models/UsersModels');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../Schemas/UserSchMongoose")

async function doesUserExist(req, res, next) {
  try {
    const user = await getUsersByEmailModel(req.body.userEmail);
    if (user) {
      req.body.user = user
      next()
      return
    }
    res.status(400).send("Incorrect email");

  } catch (err) {
    console.log(err);
  }
}

async function verifyPassword(req, res, next) {
  const { user, userPassword } = req.body;
  bcrypt.compare(userPassword, user.userPassword, (err, result) => {
    if (result) {
      const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, { expiresIn: "2h" });
      next();
    } else {
      res.status(400).send("Incorrect Password");
    }
  });
}

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).send('Authorization headers required');
    return;
  }
  const token = req.headers.authorization.replace('Bearer ', '');
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      res.status(401).send('Unauthorized');
      return;
    }
    if (decoded) {
      req.body.userId = decoded.id;
      req.body.admin = decoded.admin;
      next();
    }
  });
};

async function isAdmin(req, res, next) {
    const findUser = await User.findById(req?.body?.userId)
    if(findUser?.role !== "admin") {
      return res.status(403).send("Forbidden access");
    }
    next()
  }



module.exports = { doesUserExist, verifyPassword, auth, isAdmin }