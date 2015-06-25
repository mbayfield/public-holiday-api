var keystone = require('keystone'),
	Types = keystone.Field.Types;

/**
 * PublicHoliday Model
 * ==========
 */

var PublicHoliday = new keystone.List('PublicHoliday');

// Date	Holiday Name	Information	More Information	Applicable To
PublicHoliday.add({
	name: { type: Types.Text, initial: true, required: true, index: true },
	country: { type: Types.Text, initial: true, required: true, index: true },
	state: { type: Types.TextArray },
	date: { type: Types.Date, initial: true, required: true },
	description: { type: Types.Textarea },
	moreInformation: { type: Types.Url }
});

// PublicHoliday.schema.add({
// 	state: { type: [String], index: true },
// });

// Provide access to Keystone
PublicHoliday.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

PublicHoliday.schema.index({state:1,date:1});
PublicHoliday.schema.set('autoIndex', true);

/**
 * Registration
 */

PublicHoliday.defaultColumns = 'name, date';
PublicHoliday.register();
