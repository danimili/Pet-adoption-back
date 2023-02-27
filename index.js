const express = require("express");
const cors = require("cors");
require('dotenv').config();
const usersRoute = require("./routes/UsersRoutes");
const petsRoute = require("./routes/PetsRoute");
const mongoose = require('mongoose');
 
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(cors({ origin: ['https://pet-adoption-front-ivory.vercel.app', 'http://localhost:8080'], credentials: true }))

// app.use('/users', usersRoute);

// app.use('/pet', petsRoute);

async function init() {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, { dbName: "PetAdoption" });
    if (connection.connections[0].host) {
      console.log('Connected to DB');
      app.listen(PORT, () => {
        console.log('Listening on port ' + PORT);
      });
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

init()

module.exports = app;