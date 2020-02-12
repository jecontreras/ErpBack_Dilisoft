/**
 * Empresa.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    titulo:{
      type: 'string',
      required: true
    },
    slug:{
      type: 'string',
      required: true
    },
    nit:{
      type: 'string'
    },
    descripcion:{
      type: 'string'
    },
    pais:{
      type: 'string'
    },
    urlRespuesta:{
      type: 'string'
    },
    urlConfirmacion:{
      type: 'string',
      required: true
    }
  },

};

