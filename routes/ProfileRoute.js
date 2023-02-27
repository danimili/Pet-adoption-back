const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UserControllers');
const UsersModel = require('../Schemas/UserSchMongoose')

router.get('/',  UsersController.login ,async(req, res) => {
const profile = await UsersModel.findById(req.body.userId).lean()
})

module.exports = router;