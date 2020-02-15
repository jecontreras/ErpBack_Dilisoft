/**
 * ArchivosController
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
		Archivos.find(params)
		.paginate(skip, limit)
		.exec(
		function(err, result){
			if (err) {
					return res.badRequest(err);
			}
			return Archivos.count(query)
			.then(function(count){

				return res.ok({status: 200, count: count,  data: result});

			});
		});
},

Procedures.create = async(req, res)=>{
    let params = req.allParams();
	let resultado = Array();
	if( params.archivos[0].contrato ) await Inventario.update({id: params.archivos[0].contrato }, {foto: resultado[0].url});
    for(let row of params.archivos) { resultado.push(await Archivos.create(row).fetch());}
    return res.ok( { status: 200, data:[ ...resultado ] } );
}

module.exports = Procedures;

