'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String
  },
  picture: {
    type: String,
    default: 'https://res.cloudinary.com/dq4jevckc/image/upload/v1584440915/avatar_kletok.svg'
  },
  score:{
    type: Number,
    default:0
  },
  pokemons:[
    {
      type:Number
    }
  ]
});

module.exports = mongoose.model('User', schema);
