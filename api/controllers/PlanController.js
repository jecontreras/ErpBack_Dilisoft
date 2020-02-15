/**
 * PlanController
 *
 * @description :: Server-side logic for managing plans
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	query: function(req, res) {
			Plan.find(req.body.params)
			.exec(
					function(err, result){
							if (err) {
									return res.badRequest(err);
							}
							return res.ok({status: 200, data: result});
							});
	}
};
