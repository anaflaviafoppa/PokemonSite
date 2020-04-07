'use strict';

const { Router } = require('express');
const axios = require('axios');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

/*MODELS*/
const User = require('./../models/user');



/*SINGLE POKEMON*/
router.get('/single/:number',routeGuard, (req, res, next) => {

  //Params to request the API
  const number = req.params.number;
  

  const Pokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);

  Pokemon
     .then(output => {
       const pokemon = output.data;
       res.json(pokemon);
     })
     .catch(error => {
       console.log(error);
       res.json(error);
     });
});


/*Adicionar o Pokemon */
router.put('/edituserPush/:id', async (req, res, next) => {
  const pokemon = req.body.pokemon;
  const counterRandom = req.body.counterRandom;
  const score= req.body.score;
  const timesPlayed = req.body.timesPlayed;

  

  const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  const pokemonAll = pokemonData.data;
  
    
  const picture = pokemonAll.sprites.front_default;
  const statsNumber = pokemonAll.stats.map( stat => stat.base_stat);
  const abilities = pokemonAll.abilities.map( ability => ability.ability.name);
  
  
  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { 
        pokemons: {pokemon,picture,statsNumber,abilities, timesPlayed} 
      }, counterRandom, score
    },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});

/*Alterar APenas counter */
router.put('/edituserCounter/:id', async (req, res, next) => {
  
  const counterRandom = req.body.counterRandom;
 
  
  User.findByIdAndUpdate(
    req.params.id,
    {
      counterRandom
    },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});


/*Retirar o Pokemon Antigo*/
router.put('/editUserPull/:id', async (req, res, next) => {
  const pokemon = req.body.pokemon;
 
  User.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { 
        pokemons: {pokemon} 
      }
    },
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});


/*SINGLE USER*/
router.get('/singleUser/:id', async (req, res, next) => {
 
  User.findById(
    req.params.id
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});





module.exports = router;
