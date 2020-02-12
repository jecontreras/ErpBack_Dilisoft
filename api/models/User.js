/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    empresa:{
      model: 'empresa',
      // required: true
    },
    lastname: {
      type: 'string',
    },
    acceso: {
      type: 'string',
      enum:[
        'celular',
        'web'
      ],
      defaultsTo: 'celular'
    },
    username: {
      type: 'string',
      required: true,
      // unique: true
    },
    codigo:{
      type: 'string',
      required: true
    },
    celular: {
      type: 'string',
    },
    indicativo: {
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
    sexo: {
      type: 'string',
      enum:[
        'masculino',
        'femenino',
        'sinespecificar'
      ],
      defaultsTo: 'sinespecificar'
    },
    tipdoc: {
      type: 'string',
      enum:[
        'cc',
        'ce',
        'doc',
        'sinespecificar'
      ],
      defaultsTo: 'sinespecificar'
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
      defaultsTo: './assets/imagenes/perfil.png'
    },
    documento: {
      type: 'string'
    },
    pais: {
      type: 'string'
    },
    departamento: {
      type: 'string'
    },
    ciudad: {
      type: 'string'
    },
    direcion:{
      type: 'string'
    },
    codigopostal:{
      type: 'string'
    },
    rol: {
        model: 'rol',
        required: true
    }
  },
  customToJSON: function(){
    return _.omit(this, ['password']);
  },
  validPassword: function(values, cb){
    // sails.log.info(104, values);
    Passwords.encryptPassword({
      password:  values.password
    }).exec({
      error: function (err) {
        return reject(err);
      },
      success: function (encryptedPassword) {
        values.password = encryptedPassword;
        // sails.log.info(118, values);
        return cb();
      }
    });
  },
  beforeUpdate: function(values, res){
    if(values.contrasena){
      values.password             = values.contrasena;
      values.passwordverified     = values.verifidcontrasena;
    }
    if(values.password){
      var
        valid = this.validPassword
      ;
      User.findOne({
        id: values.id
      })
      .then(function(rta){
        return rta;
      })
      .then(function(rta){
        // sails.log.info(140, rta);
        if (rta) {
          if (!values.sistem) {
            // valid(values, res);
            Passwords.checkPassword({
                passwordAttempt: values.passwordAfter,
                encryptedPassword: rta.password,
                }).exec({
                error: function (err) {
                  delete values.password;
                  delete values.passwordAfter;
                  delete values.passwordverified;
                  return res();
                },
                incorrect: function () {
                  delete values.password;
                  delete values.passwordAfter;
                  delete values.passwordverified;
                  return res();
                },
                success: function () {
                  // sails.log.info(100, 'Men');
                  valid(values, res);
                },
              })
              ;
          }else{
            delete values.sistem;
            valid(values, res);
          }
        }else{
          return res();
        }
      })
      ;
    }else{
      return res();
    }
  }

};