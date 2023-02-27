const User = require("../Schemas/UserSchMongoose")

async function readAllUsersModel() {
    try {
        const usersList = await User.find()
        return usersList
    } catch (err) {
        console.log(err)
    }
}

async function addUsersModel(newUser) {
    try {
        const user = await User.create(newUser)
        return user.save((err, res) => {
            if (err) return console.log("errors: " + err);
            else return console.log("Result: ", res)
        });
    } catch (err) {
        console.log(err);
    }
}

async function getUsersByEmailModel(userEmail) {
    try {
        const user = await User.findOne({ userEmail: userEmail })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function getUserByNameModel(userName) {
    try {
        const user = await User.findOne({ userName: userName })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function getUsersByPasswordModel(userPassword) {
    try {
        const user = await User.findOne({ userPassword: userPassword })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function editProfileModel(userId, editData) {
    try {
        const updatedUser = await User.findOneAndUpdate({ _id: userId }, editData, { new: true })
        return updatedUser
    } catch (err) {
        console.log(err);
    }
}


module.exports = { addUsersModel, readAllUsersModel, getUsersByEmailModel, getUsersByPasswordModel, editProfileModel, getUserByNameModel }