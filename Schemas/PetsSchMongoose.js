const mongoose = require('mongoose');
const { Schema } = mongoose;

const petSchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    adoptionStatus: { type: String, required: true },
    picture: {type: String, required: false},
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    color: { type: String, required: true },
    bio: { type: String },
    dietery: { type: String },
    breed: { type: String, required: true },
})

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet