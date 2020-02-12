/**
 * Rol.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true,
      unique: true
    },
    estado:{
      type: 'string',
      enum:[
        'activo',
        'eliminado'
      ],
      defaultsTo: 'activo'
    },
    descripcion: {
      type: 'text'
    }
}

};
