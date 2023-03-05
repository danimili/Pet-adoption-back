const { addUsersModel, readAllUsersModel, editProfileModel, getUserByNameModel} = require('../models/UsersModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../Schemas/UserSchMongoose');


const signup = async (req, res) => {
  const { userName,
    userSurname,
    userPhone,
    userEmail,
    userPassword,
    userBio } = req.body
  try {
    const newUser = {
      userName,
      userSurname,
      userPhone,
      userEmail,
      userPassword,
      userBio,
      adoptArray: [],
      fosterArray: [],
      saveArray: [],
      userPetsArray: []
    }
    const user = await addUsersModel(newUser)
    res.send('/signup');
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = (req, res) => {
  const { userPassword, user } = req.body;
  try {
    bcrypt.compare(userPassword, user.userPassword, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if (!result) {
        res.status(400).send("Password don't match");
      } else {
        // const token = jwt.sign({ id: user.id, admin: user.role }, process.env.TOKEN_KEY, { expiresIn: '1h' });
      const token = user.generateToken()
        // console.log('TOKEN', token);
        // res.send({ token: token, user: user, userName: user.userName, userSurname: user.userSurname, userPhone: user.userPhone, userEmail: user.userEmail, id: user._id, userBio: user.userBio });
     res.send({user,token})
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).send(err);
  }
}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await readAllUsersModel()
    res.send(allUsers)
  } catch (err) {
    console.log(err)
  }
}

const getUser = async (req, res) => {
  try {
    const user = await getUserByNameModel()
    res.send(user)
  } catch (err) {
    console.log(err)
  }
}

const editProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const edited = await editProfileModel(id, req.body);
    if (edited) {
      res.send(edited);
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

module.exports = { signup, login, getAllUsers, editProfile, getUser };