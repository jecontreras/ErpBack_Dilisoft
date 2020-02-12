
module.exports.tarea = async function() {
    var Cron    =  require('./cron')
    Cron = Cron.cron;
    let cron      = new Cron()
    /////////////////////////////////////////////////////////////////////////////////////////////
    let tarea        = Object()
    /////////////////////////////////////////////////////////////////////////////////////////////

    tarea        = new Object()
    tarea.nombre = "Reinicio Automatico 12 Horas"
    tarea.tiempo = 12
    tarea.unidad = "hora"
    tarea.log    = false
    tarea.accion = async function(){
        
        console.log("*******************Reinicio Sistema***************")
        cron.parar()
        process.exit(0)
        
    }
    cron.AgregarTarea(tarea)
    /////////////////////////////////////////////////////////////////////////////////////////////

    cron.iniciar()
    tarea        = new Object()
    tarea.nombre = "Creacion de tareas de Facturas"
    tarea.tiempo = 60
    tarea.unidad = "minuto"
    tarea.log    = false
    tarea.accion = async function(){
        
        //console.log("Creando tarea de Facturas")
        await FacturasServices.init();
        
    }
    cron.AgregarTarea(tarea)
    /////////////////////////////////////////////////////////////////////////////////////////////

    cron.iniciar()
    tarea        = new Object()
    tarea.nombre = "Enviado tarea de Facturas get"
    tarea.tiempo = 1
    tarea.unidad = "minuto"
    tarea.log    = false
    tarea.accion = async function(){
        
        console.log("Enviado tarea de Facturas get")
        await FacturasServices.enviarFacturas();
        
    }
    cron.AgregarTarea(tarea)
    /////////////////////////////////////////////////////////////////////////////////////////////

    cron.iniciar()
    tarea        = new Object()
    tarea.nombre = "Consultando Facturas en mora tarea"
    tarea.tiempo = 15
    tarea.unidad = "minuto"
    tarea.log    = false
    tarea.accion = async function(){
        
        console.log("Consultando Facturas en mora tarea")
        await FacturasServices.consultarFacturasMora();
        
    }
    cron.AgregarTarea(tarea)
    /////////////////////////////////////////////////////////////////////////////////////////////

    cron.iniciar()
}