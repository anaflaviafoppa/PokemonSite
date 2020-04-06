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
router.put('/edituser/:id/:pokemon', (req, res, next) => {
  const pokemon = req.params.pokemon;

  User.findByIdAndUpdate(
    req.params.id,
    {
      $push: { 
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


router.put('/editUserCounters/:id/:counterRandom', (req, res, next) => {
  const counterRandom = req.params.counterRandom;
  

  User.findByIdAndUpdate(
    req.params.id,
    {counterRandom},
    { new: true }
  )
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.json(error);
    });
});



module.exports = router;
