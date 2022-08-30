'use strict';

const express = require('express');

require('dotenv').config();

const cors = require('cors');

const axios = require('axios');

const app = express();

const getRecipes = require('./components/recipe');

app.use(cors());

const PORT = process.env.PORT || 3002;







app.get('/recipes', getRecipes); 



app.listen(PORT, () => console.log(`Listening on  PORT ${PORT}!`));