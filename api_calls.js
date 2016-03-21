var request = require('request');
var assert = require('assert');

var API_CALLS = {
	//Grab all of the winners in a single category, returning an array of simplified objects.
	get_winners_by_cat: function (tid, callback) {
		//forming the API endpoint url
		var winnersUrl = 'http://www.pulitzer.org/cms/api/1/winners/cat/' + tid + '/raw.json';
		request({
			url: winnersUrl,
			json: true
		}, function(error, response, body){
			assert.equal(error, null);
			if (body && body instanceof Array){
				callback(tid, body);
			}
			else return null;
		});
	},
	get_finalists_by_cat: function(tid, callback) {
		var finalistsUrl = 'http://www.pulitzer.org/cms/api/1/finalist/' + tid + '/all/raw.json';
		request({
			url: finalistsUrl,
			json: true
		}, function(error, response, body){
			assert.equal(error, null);
			if (body && body instanceof Array){
				callback(tid, body);
			}
			else return null;
		});
	},
	//translate a tid into a category
	get_cat_from_tid: function (tid, callback) {
		//forming the API url
		var catUrl = 'http://www.pulitzer.org/cms/api/1/term/' + tid + '/raw.json';
		request({
			url: catUrl,
			json: true
		}, function(error, response, body){
			assert.equal(error, null);
			if (body){
				callback(tid, body);
			}
			else {
				return null
			}
		});
	},
	get_year_from_tid: function (tid) {
		var year = 2015 - (tid - 105);
		return year;
	}
};

exports = module.exports = API_CALLS;