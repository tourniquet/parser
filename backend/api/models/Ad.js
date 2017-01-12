/**
 * Ad.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    enabled: {
      type: 'boolean',
      defaultsTo: true
    },

    url: {
      type: 'string',
      unique: true
    },

    title: {
      type: 'string'
    },

    phone: {
      type: 'integer',
      unique: true
    }
  }
}
