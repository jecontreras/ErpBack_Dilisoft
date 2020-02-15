/**
 * Inventario.js
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
    estado: {
      type: 'string',
      enum:[
        'inactivo',
        'activo',
      ],
      defaultsTo: 'activo'
    },
    cantidad:{
      type: 'integer'
    },
    precioCompra:{
      type: 'integer',
      defaultsTo: 0
    },
    creado:{
      model: 'user'
    },
    detalle:{
      type: 'string'
    },
    codigo:{
      type: 'string',
      required: true
    },
    foto:{
      type: 'string',
      defaultsTo: "https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available_1481220154.png"
    },
    foto2:{
      type: 'string',
      defaultsTo: "https://matthewsenvironmentalsolutions.com/images/com_hikashop/upload/not-available_1481220154.png"
    },
    categoria:{
      model: 'categoria'
    },
    precio: {
      type:'integer'
    },
    tallas: {
      type: 'json'
    }
  },

};

