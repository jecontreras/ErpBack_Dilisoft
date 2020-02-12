/**
 * ContratoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let Procedures = Object();

Procedures.querys = async(req, res)=>{
    let resultado       = Object();
    let params          = req.allParams();
    resultado = await QuerysServices(Contrato,params);
    for(let row of resultado.data){
        row.detalleContrato = await DetalleContrato.findOne({id:row.detalleContrato});
        row.empresaApp = await Empresa.findOne({id:row.empresaApp});
        row.user = await InformacionExtra.findOne({id:row.user});
        row.pais = await Pais.findOne({id:row.pais});
    }
    return res.ok( { status: 200, ...resultado } );
}

Procedures.create = async(req, res)=>{
    let resultado       = Object();
    let params          = req.allParams();
    let result          = Object();
    resultado = await ValidacionesServices.validandoContrato(params);
    if( resultado.status !==200 ) return res.serverError(resultado.data);
    resultado = await Procedures.createInformacionExtra(params.usuario)
    if(!resultado) return res.serverError(resultado.data);
    result.user = resultado.data;
    
    params.detalle.valorIndividual = (Number(params.detalle.valorTotal / params.detalle.meses));
    console.log("¨¨¨¨", params.detalle);

    resultado = await Procedures.createDetalleContrato(params.detalle)
    if(!resultado) return res.serverError(resultado.data);
    result.detalleContrato = resultado.data;
    
    params.contrato.user = result.user;
    params.contrato.detalleContrato = result.detalleContrato;
    params.contrato.codigo = await Procedures.codigo();
    resultado = await Procedures.createContrato(params.contrato)
    if(!resultado) return res.serverError(resultado.data);

    return res.status(200).send(resultado.data);

}

Procedures.createInformacionExtra = async(data)=>{
    let resultado           = Object();
    resultado = await InformacionExtra.create(data).fetch();
    if(!resultado) return {status: 400, data: "Error"};
    if(Object.keys(resultado).length == 0) return {status: 400, data: "Error"};
    return {status: 200, data: resultado.id};
}

Procedures.createDetalleContrato = async(data)=>{
    let resultado           = Object();
    resultado = await DetalleContrato.create(data).fetch();
    if(!resultado) return {status: 400, data: "Error"};
    if(Object.keys(resultado).length == 0) return {status: 400, data: "Error"};
    return {status: 200, data: resultado.id};
}

Procedures.createContrato = async(data)=>{
    let resultado           = Object();
    resultado = await Contrato.create(data).fetch();
    if(!resultado) return {status: 400, data: "Error"};
    if(Object.keys(resultado).length == 0) return {status: 400, data: "Error"};
    return {status: 200, data: resultado};
}
Procedures.codigo = async()=>{
    return (Date.now().toString(36).substr(2, 9) + Math.random().toString(36).substr(2, 9)).toUpperCase();
}

module.exports = Procedures;
