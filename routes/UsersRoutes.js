const express = require('express');
const router = express.Router();
const { validateBody } = require("../Middleware/ValidateBodyMiddleware");
const { doPasswordsMatch, isNewUser, hashPassword } = require('../Middleware/SignupMiddleware');
const { doesUserExist, verifyPassword, auth, isAdmin } = require('../Middleware/LoginMiddleware');
const UsersController = require('../controllers/UserControllers');
const { signupSchema, loginSchema } = require('../Schemas/UsersSchema');

router.post('/signup', validateBody(signupSchema), doPasswordsMatch, isNewUser, hashPassword, UsersController.signup);

router.post('/login', validateBody(loginSchema), doesUserExist, verifyPassword, UsersController.login);

router.get('/', UsersController.getAllUsers);

router.get('/home', UsersController.getUser);

router.put('/:id', UsersController.editProfile);

router.get('/profile',  UsersController.login ,async(req, res) => {
    const profile = await UsersModel.findById(req.body.userId).lean()
    })

module.exports = router;