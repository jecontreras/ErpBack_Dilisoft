/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    lastname: {
      type: 'string',
      required: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    celular: {
      type: 'string',
    },
    estado: {
     type: 'string',
     enum:[
       'inactivo',
       'activo',
     ],
     defaultsTo: 'activo'
   },
   celular: {
    type: 'string'
   },
    sexo: {
      type: 'string'
    },
    tipdoc: {
      type: 'string'
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'text',
      required: true
    },
    foto: {
      type: 'string',
      defaultsTo: 'https://publi-click.herokuapp.com/images/chico.png'
    },
    cabeza: {
      model: 'user'
    },
    documento: {
      type: 'string'
    },
    rol: {
        model: 'rol'
    }
  },
    customToJSON: function(){
    return _.omit(this, ['password', 'salt']);
  },
};
