/**
 * Archivos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    inventario:{
      model: 'inventario'
    },
    factura: {
      model: 'facturas'
    },
    name: {
      type: 'string',
      required: true
    },
    type: {
      type: 'string',
      required: true
    },
    size: {
      type: 'string',
      required: true
    },
    url: {
      type: 'string',
      required: true
    }
  },

};