/**
 * InformacionExtra.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre:{
      type: 'string'
    },
    email:{
      type: 'string'
    },
    numero:{
      type: 'integer'
    },
    cedula:{
      type: 'string'
    },
    direccion:{
      type: 'string'
    },
    pais:{
      model:'pais'
    },
    estado:{
      type: 'string',
      enum:[
        'activo',
        'eliminado'
      ],
      defaultsTo: 'activo'
    },

  },

};

