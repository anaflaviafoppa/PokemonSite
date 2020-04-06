'use strict';

const { Router } = require('express');
const router = new Router();
const routeGuard = require('./../middleware/route-guard');

/*MODELS*/
const User = require('./../models/user');


/*Search for all Users*/
router.get('/', (req, res, next) => {

  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
