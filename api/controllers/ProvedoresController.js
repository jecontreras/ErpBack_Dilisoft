/**
 * ProvedoresController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    query: function(req, res) {
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
			Provedores.find(params)
			.paginate(skip, limit)
			.exec(
			function(err, result){
				if (err) {
						return res.badRequest(err);
				}
				return Provedores.count(query)
				.then(function(count){

					return res.ok({status: 200, count: count,  data: result});

				});
			});
	},

};

