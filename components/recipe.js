'use strict';
const axios = require('axios');
const Recipe = require('./recipe-class'); // our recipe class (anon classes?)

const inMemoryDB = {} // where we store our Data used :)

module.exports = async (req, response) =>{

const ingredient = req.query.ingredient

if(inMemoryDB[ingredient] !== undefined){
    console.log('getting info from db', ingredient)
    // console.log('db', inMemoryDB);
    response.status(200).send(inMemoryDB[ingredient]);
} else {
    console.log('getting info from super', ingredient);
const url = `https://api.edamam.com/api/recipes/v2?app_id=${process.env.FOOD_APP_ID}&app_key=${process.env.FOOD_APP_KEY}&q=${ingredient}&type=public`;


// using async / await
try{
const res = await axios.get(url);
const recipeArr = res.data.hits.map(recipe => new Recipe(recipe.recipe));
inMemoryDB[ingredient] = recipeArr; // just being added to the obj via bracket notation.
console.log('putting info in db');
response.status(200).send(recipeArr); // send what is availble. 
}catch(error){
console.log(error);
} 
} // end else


}

// using .then() / .catch()
//    axios.get(url).then(res => {
//     const recipeArr = res.data.hits.map((recipe) => new Recipe(recipe.recipe));
//     response.status(200).send(recipeArr);
// }).catch(err => {
//     console.error(err);
// })
