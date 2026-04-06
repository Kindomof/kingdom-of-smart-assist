const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Haɗin Database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database dinka ya haɗu lafiya! 🚀"))
  .catch(err => console.log("An samu matsala wajen haɗa Database: ", err));

app.get('/', (req, res) => res.send("Kingdom of Smart Assist API is Running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server yana kunne a port ${PORT}`));
