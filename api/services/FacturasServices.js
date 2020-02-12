const Procedures = Object();
const moment = require('moment');

/////////////////////////////////////////////////////////////////////////////////7
Procedures.init = async()=>{
    let resultado = Array();

    resultado = await Contrato.find({
        where:{
            estado: "activo",
            empresaApp: { '!=' : null},
            user: { '!=' : null},
            detalleContrato: { '!=' : null},
            pais: { '!=' : null},
            facturasCreadas: false
        }
    }).populate('detalleContrato').populate('pais').populate('user').populate('empresaApp').limit(-1);
    console.log("*** count", resultado.length)

    for(let row of resultado){
        //console.log("***", row)
        for(let i = 1; i <= row.detalleContrato.meses; i++){
            let meses = new moment(row.detalleContrato.empiezasPagar);
            if(i >1) meses = new moment(row.detalleContrato.empiezasPagar).add(i-1,'months');
            let data = {
                idContrato: row.id,
                numeroFactura: Number(i),
                facturasAtrasadas: 0,
                fechaGenerada: new moment(meses).format('DD/MM/YYYY HH:mm:ss'),
                fechaGeneradaFormat: new moment(meses).format('DD/MM/YYYY'),
                fechaCorte: row.detalleContrato.diasHabilesCorte,
                fechaMaximaCorte: row.detalleContrato.diasHabilesCorte,
                valorIva: Number( row.detalleContrato.valorIva ),
                valorTotal: Number( row.detalleContrato.valorTotal ),
                valorApagar: Number( row.detalleContrato.valorTotal/row.detalleContrato.meses ),
                detalle: row.detalle
            };
            //console.log("******", data)
            await Facturas.create(data).fetch();
            //console.log("**********", resultado);
            if(i == row.detalleContrato.meses) await Contrato.update( { id: row.id }, { facturasCreadas: true } );
        }   
    }

}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.enviarFacturas = async()=>{
    let resultado = Array();

    resultado = await Facturas.find({
        where:{
            fechaGeneradaFormat: { '<': new moment().format('DD/MM/YYYY') },
            respuestaServer: { '!=' : "enviado"}
        }
    }).populate('idContrato').limit(-1);

    console.log(resultado.length);

    for(let row of resultado){
        let atrasados = await Procedures.consultarFacturasPendientes(row);
        if(atrasados){ 
            row.valorApagar+=atrasados.valorApagar; 
            row.facturasAtrasadas+=atrasados.facturasAtrasadas; 
            let actualizado = await Procedures.actualizarFactura({id:row.id, valorApagar: row.valorApagar, facturasAtrasadas: row.facturasAtrasadas});
        }
        row.idContrato = await Procedures.consultarContrato(row.idContrato);
        //console.log("Finis***", row);
        let result = await Procedures.enviarData(_.omit(row, ['id']));
        if(result){
            let cambiarEstado = await Procedures.actualizarFactura({id: row.id, respuestaServer:"enviado"})
            console.log("Finis", result);
        }
    }

}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.consultarFacturasMora = async()=>{
    let resultado = Object();
    resultado = await Facturas.find({
        where:{
            fechaGeneradaFormat: { '<': new moment().format('DD/MM/YYYY') },
            estado: 'activo'
        },
        sort: 'numeroFactura DESC'
    }).limit(-1);

    for(let row of resultado){
        let
            fecha1 = new Date(row.fechaGeneradaFormat),
            fecha2 = new Date(),
            diasDif = fecha2.getTime() - fecha1.getTime(),
            dias = Math.round(diasDif / (1000 * 60 * 60 * 24))
        ;
        let result = Object();
        if( dias > row.fechaCorte ) result = await Procedures.actualizarFactura( { id:row.id, estado: "atrasado" } );
    }
}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.actualizarFactura = async(data)=>{
    let resultado = Object();
    resultado = await Facturas.update( { id: data.id }, data );
    return true;
}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.consultarFacturasPendientes = async(data)=>{
    if(!data) return false;
    let resultado = Array();
    resultado = await Facturas.find({
        where:{
            fechaGeneradaFormat: { '<': new moment().format('DD/MM/YYYY') },
            estado: 'atrasado',
            idContrato: data.idContrato.id
        },
        sort: 'numeroFactura DESC'
    }).limit(1);
    if(Object.keys(resultado).length === 0) return false;
    resultado = resultado[0];
    let result = {
        valorApagar: resultado.valorApagar,
        facturasAtrasadas: resultado.facturasAtrasadas
    };
    return result;

}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.consultarContrato = async(data)=>{
    let resultado = Object();
    resultado = await Contrato.find({where: {id:data.id}}).populate('empresaApp').populate('user').populate('detalleContrato').populate('pais').limit(1);
    return resultado[0];
}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.enviarData = async(data)=>{
    let resultado = Object();
    let ipEmpresa = await Procedures.consultarEmpresa(data.idContrato.empresaApp);
    if(!ipEmpresa) return ErroresServices.create({mensaje: `ipEmpresa no encontrada ${ data.idContrato.empresaApp } para enviar la respuesta`, idFactura: data.id});
    resultado = await RequestServices.enviar(ipEmpresa, JSON.stringify(data));
    if(!resultado) return ErroresServices.create({mensaje: `Error no se pudo enviar respuesta ${ ipEmpresa } server error`, idFactura: data.id});
    return true;
}

/////////////////////////////////////////////////////////////////////////////////7
Procedures.consultarEmpresa = async(data)=>{
    let resultado = Object();
    resultado = await Empresa.find({where:{id:data.id}}).limit(1);
    if(!resultado) return false;
    if(Object.keys(resultado).length === 0) return false;
    resultado = resultado[0];
    return resultado.urlConfirmacion;
}
/////////////////////////////////////////////////////////////////////////////////7
module.exports = Procedures;