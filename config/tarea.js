
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
    
    cron.iniciar()
}