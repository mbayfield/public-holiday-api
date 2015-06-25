var _ = require('underscore'),
	keystone = require('keystone'),
	moment = require('moment');
	
exports = module.exports = function(req, res) {

	var PublicHoliday = keystone.list('PublicHoliday');
	
	console.log(new Date(req.query.date + ' 00:00:00'));
	var query = PublicHoliday.model.find({state: req.params.state, date: {$eq: new Date(req.query.date + ' 00:00:00')}});
		// query.select('_id name');
		// query.limit(20);
		query.exec(function(err, data) {
			console.log(err);
			console.log(data);
			if (err || !data) {
				return res.json({
					success: false,
					err: err
				});
			} else {
				// remap the results
				// remapListings = _.map(listings, function(i) {
				// 	return { _id: i._id, name: i.name }
				// });
				return res.json({
					success: true,
					data: data
				});
			}
		});
	
}
