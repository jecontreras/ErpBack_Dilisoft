/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var Passwords = require('machinepack-passwords');
let Procedures = Object();

Procedures.register = async(req, res)=>{
    let
        params = req.allParams()
    ;
  // sails.log.info(26, params);
  if((params.password !== params.confirpassword) && (!params.username && !params.email)) return res.ok({status: 400, data: "error en el envio de los datos"});
    //   Validando si existe  el usuario
  let user = await User.findOne({where:{username: params.username}});
  if(user) return res.ok({status: 400, data: "error el username ya se encuentra registrado"});
    //   Validando la Contraseña
  let password = await Procedures.encryptedPassword(params.password);
  if(!password) return res.serverError("password Error");
  params.password = password;
    //   Codigo
  function codigo(){return (Date.now().toString(36).substr(2, 3) + Math.random().toString(36).substr(2, 2)).toUpperCase();}
    //   Rol
  let rol = await Rol.findOne({nombre: params.rol || "usuario"});
  if(!rol) {
    rol = await Rol.create({nombre: params.rol || "usuario",descripcion: "rol del usuario"}).fetch();
    if(!rol) return res.ok({status: 400, data: "error al crear el rol"});
  }
  params.rol = rol.id;
  params.codigo = codigo();
  user = await User.create(params).fetch();
  if(!user) return res.badRequest(err);
  return res.ok({status: 200, data: user});
}
Procedures.encryptedPassword = (password) =>{
    return new Promise(resolve=>{
        Passwords.encryptPassword({
            password: password,
          }).exec({
            error: function (err){
              resolve(false)
            },
            success: function (password) {
              resolve(password);

            }
        });
    })

}

Procedures.query = async function(req, res) {
    User.find(req.body.params)
    .exec(
        function(err, result){
            if (err) {
                return res.badRequest(err);
            }
            return res.ok({status: 200, data: result});
            });
}

Procedures.login = async function(req, res){
    User.findOne({username: req.param('username')}).exec(function(err, user){
        if(err) return res.send({'success': false,'message': 'Peticion fallida','data': err});
        if(!user) return res.send({'success': false,'message': 'Usuario no encontrado','data': user});
        Passwords.checkPassword({
            passwordAttempt: req.param('password'),
            encryptedPassword: user.password,
            }).exec({
            error: function (err) {
                return res.send({'success': false,'message': 'Eror del servidor','data': err});
            },
            incorrect: function () {
                return res.send({'success': false,'message': 'Contraseña incorrecta'});
            },
            success: function () {
                user.password = '';
                sails.log('User '+ user.id +' has logged in.');
                return res.send({
                'success': true,
                'message': 'Peticion realizada',
                'data': user
                });

            },
            });
        })
}

module.exports = Procedures;
