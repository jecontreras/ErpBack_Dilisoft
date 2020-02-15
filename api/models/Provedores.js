/**
 * Provedores.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre:{
      type: 'string',
      required: true
    },
    celular:{
      type: 'string'
    },
    estado: {
      type: 'string',
      enum:[
        'inactivo',
        'activo',
      ],
      defaultsTo: 'activo'
    },
    email:{
      type: 'string'
    },
    direccion:{
      type: 'string'
    },
    detalle:{
      type: 'string'
    }

  },

};

