const jwt = require("jsonwebtoken")
const mongoose = require('mongoose');

const signupSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    userSurname: { type: String, required: true },
    userPhone: { type: Number, required: true },
    userEmail: { type: String, required: true, unique: true },
    userPassword: { type: String, required: true },
    userBio: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    adoptArray: [mongoose.Types.ObjectId],
    fosterArray: [mongoose.Types.ObjectId],
    saveArray: [mongoose.Types.ObjectId],
    userPetsArray: [mongoose.Types.ObjectId]
})

signupSchema.methods.generateToken= function(){
    const user=this
    const token = jwt.sign({ id: user.id ,userEmail:user.userEmail}, process.env.TOKEN_KEY, { expiresIn: "2h" });
    return token
}

const User = mongoose.model('User', signupSchema);

module.exports = User
