/**
 * FacturasController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
let Procedures = Object();

Procedures.query =  function(req, res) {
	var
		params = req.allParams(),
		limit = 10,
		query = {},
		skip = 0
	;
		query = {
			where: params.where
		};
		if(params.skip){
	  skip = params.skip;
	  delete params.skip;
	}
	if(params.limit){
	  limit = params.limit;
	  delete params.limit;
	}
	if(!params.where){
	  params = {
		where: params
	  };
	}
	params.sort = 'createdAt desc';
		Facturas.find(params)
		.paginate(skip, limit)
		.exec(
		function(err, result){
			if (err) {
					return res.badRequest(err);
			}
			return Facturas.count(query)
			.then(function(count){

				return res.ok({status: 200, count: count,  data: result});

			});
		});
}

Procedures.create = async (req, res)=>{
	let params = req.allParams();
	let resultado = Object();	
	let result = Object();
	resultado = await Procedures.createFactura(params.factura);
	for(let row of params.articulos){
		console.log("***", row);
		let data = {
			factura: resultado.id,
			inventario: row.id,
			precio: row.precio,
			codigoTalla: row.codigoTalla,
			ColorTalla: row.ColorTalla,
			Adtalla: row.Adtalla,
			Addescuento: row.Addescuento,
			totalprecio: row.totalprecio,
			Adcantidad: row.Adcantidad
		};
		result = await Procedures.createFacturaInventario(data);
		let articulo = await Procedures.getInventario(row.id);
		if( !articulo ) continue;
		console.log(params.factura);
		let ProcesoForm = Object();
		if(params.factura.tipo == 'compra') ProcesoForm = await Procedures.AgregarInventario(articulo, data);
		if(params.factura.tipo === 'factura') ProcesoForm =  await Procedures.ResetInventario(articulo, data);
	}
	return res.ok({status: 200, data:resultado});
}

Procedures.createFacturaInventario = async( data )=>{
	let resultado = await FacturasIventario.create(data).fetch();
	return resultado;
}

Procedures.createFactura = async( data )=>{
	let resultado = await Facturas.create(data).fetch();
	return resultado;
}

Procedures.getInventario = async( id )=>{
	let resultado = await Inventario.find({where:{id:id}}).limit(1);
	if( !resultado ) return false;
	if( Object.keys(resultado).length === 0 ) return false;
	return resultado[0];
}

Procedures.AgregarInventario = async( articulo, data )=>{
	let resultado = Object();
	let tallas = Object();
	if( Object.keys(articulo.tallas).length > 0 ) tallas = await Procedures.ProcesarInventarioPush( articulo, data );	
	else {
		articulo.cantidad = Number(articulo.cantidad+data.Adcantidad);
		tallas = articulo;
	}
	resultado = await Procedures.updateInventario(tallas);
	return tallas;
}

Procedures.ProcesarInventarioPush = async( articulo, data )=>{
	let tallas = articulo.tallas.find( row=>row.codigo == data.codigoTalla );
	if(tallas) tallas.cantidad = Number(tallas.cantidad)+Number(data.Adcantidad);
	let count = 0;
	for( let row of articulo.tallas ) count+=Number(row.cantidad);
	articulo.cantidad = count;
	return articulo;
}

Procedures.ResetInventario = async( articulo, data )=>{
	let resultado = Object();
	let tallas = Object();
	if( Object.keys(articulo.tallas).length > 0 ) tallas = await Procedures.ProcesarInventarioReset( articulo, data );	
	else {
		articulo.cantidad = Number(articulo.cantidad)-Number(data.Adcantidad);
		tallas = articulo;
	}
	resultado = await Procedures.updateInventario(tallas);
	return tallas;

}

Procedures.ProcesarInventarioReset = async( articulo, data )=>{
	let tallas = articulo.tallas.find( row=>row.codigo == data.codigoTalla );
	if(tallas) tallas.cantidad = Number(tallas.cantidad)-Number(data.Adcantidad);
	let count = 0;
	for( let row of articulo.tallas ) count+=Number(row.cantidad);
	articulo.cantidad = count;
	return articulo;
}

Procedures.updateInventario = async( data )=>{
	let resultado = await Inventario.update({id: data.id}, { cantidad: data.cantidad, tallas: data.tallas });
	return resultado;
}

module.exports = Procedures;

