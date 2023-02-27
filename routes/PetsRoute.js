const express = require('express');
const { readAllPetsModel } = require('../models/PetsModels');
const PetsController = require('../controllers/PetsController');
const { validateBody } = require('../Middleware/ValidateBodyPets')
const router = express.Router();
const petSchema = require('../Schemas/PetSchema');
const { upload, generateUrl } = require('../Middleware/imagesMiddleware')
const { auth, isAdmin } = require('../Middleware/LoginMiddleware')
const { queries, typesBeforeAdd } = require('../Middleware/petsmiddleware')

router.get('/search', queries, PetsController.searchPet)

router.get('/', async (req, res) => {
  try {
    const allPets = await readAllPetsModel();
    await res.send(allPets);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/', upload.single('petImage'), typesBeforeAdd, validateBody(petSchema), PetsController.addPet)

router.delete('/:petId', PetsController.deletePet);

router.get('/mypet/:id', PetsController.getUserPets)

router.get('/:id', PetsController.getPet);

router.put('/:petId', PetsController.editPet);

router.post('/:id/adopt', auth, PetsController.handleAdopt);

router.post('/:id/foster', auth, PetsController.handleFoster);

router.post('/:id/save', auth, PetsController.handleSave);

router.post('/:id/return', auth, PetsController.handleReturn);

module.exports = router;
