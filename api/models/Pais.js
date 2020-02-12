/**
 * Pais.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    pais:{
      type: 'string'
    },
    nombreCorto:{
      type: 'string'
    },
    moneda:{
      type: 'string'
    },
    iva:{
      type: 'integer'
    },
    indicativo:{
      type: 'string'
    },
    detalle:{
      type: 'string'
    }

  },

};

