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
    default: 'https://res.cloudinary.com/ddz8awd1y/image/upload/v1586571859/profile_pwyz0g.png'
  },
  score:{
    type: Number,
    default:0
  },
  pokemons: [
    {
       pokemon: {
          type: String
       },
       timesPlayed: {
          type: Number,
          default:0 
       },
       picture:{
         type: String
       },
       statsNumber:[
         {
           type:Number
         }
       ],
       abilities:[
         {
           type:String
         }
       ]
     }
  ],
  counterRandom:{
    type: Number,
    default:0
    
  }
});

module.exports = mongoose.model('User', schema);
