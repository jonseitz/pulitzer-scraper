var request = require('request');
var assert = require('assert');

var API_CALLS = {
	get_winners_by_cat: function (tid, callback) {
		if (tid >= 204 && tid <= 225) {
			this.get_cat_from_tid(tid, function(tid, catName){
					var winnersUrl = 'http://www.pulitzer.org/cms/api/1/winners/cat/' + tid + '/raw.json';
					request({
						url: winnersUrl,
						json: true
					}, function(error, response, body){
						assert.equal(error, null);
						var list = [];
						if (body) {
							body.forEach(function(val, index){
								var year = 2015 - (val.field_year.und[0].tid - 105);
								var publication, citation = 'N/A';
								if (val.field_publication.und){
									publication = val.field_publication.und[0].safe_value;
								}
								if (val.field_abbr_citation.und){
									citation = val.field_abbr_citation.und[0].safe_value;
								}				
								list.push({
									"category": catName,
									"year": year,
									"title": val.title,
									"publication": publication,
									"citation": citation
								});
							});
							callback(list);
						}
				});
			});
		}
		else {
			return null;
		}
	},
	get_cat_from_tid: function (tid, callback) {
			var catUrl = 'http://www.pulitzer.org/cms/api/1/term/' + tid + '/raw.json';
			request({
				url: catUrl,
				json: true
			}, function(error, response, body){
				assert.equal(error, null);
				if (body.name){
					callback(tid, body.name);
				}
				else {
					return null
				}
			});
	},
	get_year_from_tid: function(tid){
		if (tid < 105 || tid > 203){
			return null;
		}
		else {
			var diff = tid - 105;
			return (2015 - diff);
		}
	}
};

exports = module.exports = API_CALLS;