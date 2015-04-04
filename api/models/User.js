'use strict';

/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    email: {
      type: 'string',
      email: true,
      required: true
    },

    name: {
      type: 'string'
    },

    gender: {
      type: 'string',
      enum: ['male', 'female'],
      defaultsTo: 'male'
    },

    facebookId: {
        type: 'string',
        required: true,
        unique: true
    }
  }
};
