/**
 * SocketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');

module.exports = {
  
    emitir:(req, res)=>{
        // console.log(sailsIOClient())
        let params = req.allParams();
        //  console.log("***********", params.modelo)
        sails.sockets.join(req.socket,'app');
        res.json({data:'exitoso'});
        sails.sockets.broadcast('app',params.modelo,{data:params.mensaje, metodo : params.metodo});
    }
};

