/**
 * Categoria.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    categoria:{
      type: 'string'
    },
    slug:{
      type: 'string'
    },
    categoriaDe:{
      type: 'string',
      enum:[
        'producto'
      ],
      defaultsTo: 'producto'
    },
    detalle:{
      type: 'string'
    }
  },

};

