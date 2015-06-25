var _ = require('underscore'),
	keystone = require('keystone'),
	moment = require('moment');
	
exports = module.exports = function(req, res) {

	var PublicHoliday = keystone.list('PublicHoliday');
	
	var query = PublicHoliday.model.find({state: req.params.state, date: {$eq: new Date(req.query.date + ' 00:00:00')}});
		// query.select('name moreInformation description state date');
		query.exec(function(err, result) {
			if (err || !result) {
				return res.json({
					success: false,
					err: err
				});
			} else {
				return res.json({
					data: result
				});
			}
		});
	
}
