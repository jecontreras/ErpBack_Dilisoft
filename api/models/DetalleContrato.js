/**
 * DetalleContrato.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    tipo: {
      type: 'string',
      enum:[
        'credito',
        'contado'
      ],
      required:true
    },
    meses: {
      type: 'integer',
      required:true
    },
    empiezasPagar:{
      type: 'string',
      required:true
    },
    diasHabilesCorte:{
      type: 'integer',
      defaultsTo: 0,
    },
    valorIndividual:{
      type: 'integer',
      required:true
    },
    valorTotal:{
      type: 'integer',
      required:true
    },
    valorIva:{
      type: 'integer',
      required:true
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

