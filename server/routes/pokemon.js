'use strict';

const { Router } = require('express');
const axios = require('axios');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');


/*SINGLE RANDOM POKEMON*/
router.get('/single', (req, res, next) => {
  //Params to request the API
  const number = req.body.number;
  const Pokemon = axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);

  Pokemon
     .then(output => {
       const pokemon = output.data;
       res.json(pokemon);
     })
     .catch(error => {
       res.json(error);
     });
});


module.exports = router;
