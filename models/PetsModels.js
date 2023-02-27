const Pet = require('../Schemas/PetsSchMongoose');
const User = require('../Schemas/UserSchMongoose');
const ObjectID = require('mongodb').ObjectId;

async function doesPetExistModel(name) {
  try {
    const pet = await Pet.findOne({ name: name })
    return pet
  } catch (err) {
    console.log(err)
  }
}

async function readAllPetsModel() {
  try {
    const petsList = await Pet.find();
    return petsList;
  } catch (err) {
    console.log(err);
  }
}

async function getPetBtID(id) {
  try {
    const wantedPet = await Pet.findById(id);
    return wantedPet;
  } catch (err) {
    console.log(err);
  }
}

async function addPetModel(newPet) {
  try {
    const pet = await Pet.create(newPet)
    return pet.save((err, res) => {
      if (err) return console.log("errors: " + err);
      else return console.log("Result: ", res)
    });
  } catch (err) {
    console.log(err);
  }
}

async function deletePetModel(petId) {
  try {
    const pet = await Pet.deleteOne({ _id: petId });
    return pet
  } catch (err) {
    console.log(err);
  }
}

async function getSearchedPets(filters) {
  try {
    const petsList = await Pet.find(filters);
    return petsList;
  } catch (err) {
    console.log(err);
  }
}

async function editPetModel(petId, editData) {
  try {
    const pet = await Pet.findOneAndUpdate({ _id: petId }, editData, { new: true })
    return pet
  } catch (err) {
    console.log(err);
  }
}

async function adoptPetModel(userId, petId) {
  try {
    const isAdopted = await User.find({ _id: ObjectID(userId), adoptArray: petId })
    if (isAdopted[0]) {
      return 'already adopted'
    } else {
      await User.findByIdAndUpdate(userId, { $push: { adoptArray: petId } })
      const newPet = await Pet.findByIdAndUpdate(petId, { adoptionStatus: "Adopted" }, { new: true })
      return newPet
    }
  } catch (err) {
    console.log(err);
  }
}

async function returnPetModel(userId, petId) {
try{
      const returnAdopt = await User.findByIdAndUpdate(userId, { $pull: { adoptArray: petId } })
      const returnFoster = await User.findByIdAndUpdate(userId, { $pull: { fosterArray: petId } })
      const returnSave =  await User.findByIdAndUpdate(userId, { $pull: { saveArray: petId } })

      const newPet = await Pet.findByIdAndUpdate(petId, { adoptionStatus: "Available" }, { new: true })
      return newPet

  } catch (err) {
    console.log(err);
  }
}

async function fosterPetModel(userId, petId) {
  try {
    const isFostered = await User.find({ _id: ObjectID(userId), fosterArray: petId })
    if (isFostered[0]) {
      return 'already fostered'
    } else {
      await User.findByIdAndUpdate(userId, { $push: { fosterArray: petId } })
      const newPet = await Pet.findByIdAndUpdate(petId, { adoptionStatus: "Fostered" }, { new: true })
      return newPet
    }
  } catch (err) {
    console.log(err);
  }
}

async function savePetModel(userId, petId) {
  try {
    const isAdopted = await User.find({ _id: ObjectID(userId), adoptArray: petId })
    if (isAdopted[0]) {
      return 'already adopted'
    } else {
      await User.findByIdAndUpdate(userId, { $push: { adoptArray: petId } })
      // const newPet = await Pet.findByIdAndUpdate(petId, { adoptionStatus: "Adopted" }, { new: true })
      return newPet
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUserPetsModel(userId) {
  try{
    const userPets = await User.findById(userId)
    const list = [...userPets.adoptArray, ...userPets.fosterArray];
    return list;
  } catch(err) {
    console.log(err);
  }
}

module.exports = { doesPetExistModel, addPetModel, deletePetModel, readAllPetsModel, getPetBtID, getSearchedPets, editPetModel, adoptPetModel, returnPetModel, fosterPetModel, savePetModel, getUserPetsModel }
