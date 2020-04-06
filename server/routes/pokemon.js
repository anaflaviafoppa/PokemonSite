'use strict';

const { Router } = require('express');
const axios = require('axios');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');


/*SINGLE RANDOM POKEMON*/
router.get('/single/:number', (req, res, next) => {

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


module.exports = router;
