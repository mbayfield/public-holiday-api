var fs = require('fs'),
	path = require('path'),
	moment = require("moment"),
	Baby = require("babyparse");

var filePath = path.join(__dirname, 'data/2015-2016-australianpublicholidays.csv');

// Read CSV
var f = fs.readFileSync( filePath, { encoding: 'utf-8'}, function(err) {
	console.log(err);
});

var stateArray = ['ACT','NSW','NT','QLD','SA','TAS','VIC','WA'];

var json = Baby.parse(f,{
    header: true
}).data;
console.log(json);
json.forEach(function(d) {
    d.country = 'AU';
    // change all  NAT's to stateArray
    if(d['state'] === 'NAT') {
        d['state'] = stateArray;
    } else {
        d['state'] = [d['state'].replace(/['|']/g,',')]; // Make states and array
    }
    
    // Format dates better
    d['date'] = moment(d['date'], "YYYYMMDD").format(); 
});

exports.create = {
	PublicHoliday: json
};
