const { addPetModel, getPetBtID, deletePetModel, readAllPetsModel, getSearchedPets, editPetModel, adoptPetModel, fosterPetModel, savePetModel, getUserPetsModel, returnPetModel } = require("../models/PetsModels");


const getAllPets = async (req, res) => {
  try {
    const allPets = await readAllPetsModel();
    res.send(allPets);
  } catch (err) {
    res.status(500).send(err);
  }
}

const addPet = async (req, res) => {
  try {
    const newPet = {
      ...req.body,
      picture: req.file?.path
    };
    const PetAdded = addPetModel(newPet);
    if (PetAdded) {
      res.send(newPet);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err)
  }
}

async function getPet(req, res) {
  try {
    const id = req.params;
    const pet = await getPetBtID(id.id)
    res.send(pet)
  } catch (error) {
    console.log(error)
  }
}

async function deletePet(req, res) {
  try {
    const { petId } = req.params;
    const deletedPetId = await deletePetModel(petId);
    if (deletedPetId) {
      res.send({ ok: true, deletedId: petId, message: "Pet Deleted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
}

async function searchPet(req, res) {
  const searchedPets = await getSearchedPets(req.query)
  res.send(searchedPets)
}

const editPet = async (req, res) => {
  try {
    const { PetId } = req.params;
    const edited = await editPetModel(PetId, req.body);
    if (edited) {
      res.send(edited);
    }
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

const handleAdopt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const newPet = await adoptPetModel(userId, id)
    res.send(newPet)
  } catch (err) {
    console.log(err)
    next(err);
  }
}

const handleReturn = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const returnPet = await returnPetModel(userId, id)
    res.send({ok: true})
  } catch (err) {
    console.log(err)
    next(err);
  }
}

const handleFoster = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const newPet = await fosterPetModel(userId, id)
    res.send(newPet)
  } catch (err) {
    console.log(err)
    next(err);
  }
}

const handleSave = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const newPet = await savePetModel(userId, id)
    res.send(newPet)
  } catch (err) {
    console.log(err)
    next(err);
  }
}

const getUserPets = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userPets = await getUserPetsModel(id)
    res.send(userPets)
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getAllPets, deletePet, addPet, getPet, searchPet, editPet, handleAdopt, handleFoster, handleSave, getUserPets, handleReturn }