/**
 * Contrato.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    codigo:{
      type: 'string',
      required:true
    },
    detalle:{
      type: 'string',
      required: true
    },
    estado:{
      type: 'string',
      enum:[
        'activo',
        'finalizo',
        'eliminado',
        'cancelado'
      ],
      defaultsTo: 'activo'
    },
    valorApagar:{
      type: 'integer',
      required: true
    },
    empresaApp:{
      model: 'empresa',
      required: true
    },
    user:{
      model: 'informacionExtra',
      required: true
    },
    creado:{
      model: 'user'
    },
    detalleContrato:{
      model:'detalleContrato',
      required: true
    },
    pais: {
      model: 'pais'
    },
    facturasCreadas:{
      type: 'boolean',
      defaultsTo: false
    }
  },

};

