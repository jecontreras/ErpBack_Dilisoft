/**
 * ValidacionesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures          = Object();

Procedures.validandoContrato = async(data)=>{
    
    if(!data) return {status: 400, data: "Error data undefined"};
    if(Object.keys(data).length === 0) return {status: 400, data: "Error data undefined"};
    if(Object.keys(data.contrato).length === 0) return {status: 400, data: "Error data contrato undefined"};
    if(Object.keys(data.usuario).length === 0) return {status: 400, data: "Error usuario undefined"};
    if(Object.keys(data.detalle).length === 0) return {status: 400, data: "Error detalle undefined"};
    
    if(!data.contrato.pais) return {status: 400, data: "Error pais undefined"};
    if(!data.contrato.detalle) return {status: 400, data: "Error detelle undefined"};
    if(!data.contrato.valorApagar) return {status: 400, data: "Error valorApagar undefined"};
    if(!data.contrato.empresaApp) return {status: 400, data: "Error empresaApp undefined"};

    if(!data.usuario.nombre) return {status: 400, data: "Error nombre usuario undefined"};
    if(!data.usuario.email) return {status: 400, data: "Error email usuario undefined"};
    if(!data.usuario.numero) return {status: 400, data: "Error numero usuario undefined"};
    if(!data.usuario.cedula) return {status: 400, data: "Error cedula usuario undefined"};
    if(!data.usuario.direccion) return {status: 400, data: "Error direccion usuario undefined"};
    if(!data.usuario.pais) return {status: 400, data: "Error pais usuario undefined"};

    if(!data.detalle.tipo) return {status: 400, data: "Error tipo detalle undefined"};
    if(!data.detalle.meses) return {status: 400, data: "Error meses detalle undefined"};
    if(!data.detalle.valorTotal) return {status: 400, data: "Error valorTotal detalle undefined"};
    if(!data.detalle.valorIva) return {status: 400, data: "Error valorIva detalle undefined"};
    if(!data.detalle.empiezasPagar) return {status: 400, data: "Error empiezasPagar detalle undefined"};
    if(!data.detalle.diasHabilesCorte) return {status: 400, data: "Error diasHabilesCorte detalle undefined"};



    if(typeof data.contrato.valorApagar !== 'number') return {status: 400, data: "Error valorApagar contrato no es un numero"};

    if(typeof data.usuario.numero !== 'number') return {status: 400, data: "Error numero usuario no es un numero"};

    if(typeof data.detalle.meses !== 'number') return {status: 400, data: "Error meses detalle no es un numero"};
    if(typeof data.detalle.valorTotal !== 'number') return {status: 400, data: "Error valorTotal detalle no es un numero"};
    if(typeof data.detalle.valorIva !== 'number') return {status: 400, data: "Error valorIva detalle no es un numero"};
    if(typeof data.detalle.empiezasPagar !== 'string') return {status: 400, data: "Error empiezasPagar detalle no es un string"};
    if(typeof data.detalle.diasHabilesCorte !== 'number') return {status: 400, data: "Error diasHabilesCorte detalle no es un numero"};

    if((data.detalle.tipo === 'credito') || (data.detalle.tipo === 'contado')) {}
    else return {status: 400, data: "Error tipo detalle invalido"};
    return {status:200, data: 'validacion ok'};
}

module.exports = Procedures;

