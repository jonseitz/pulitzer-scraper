var request = require('request');
var assert = require('assert');

var API_CALLS = {
	//Grab all of the winners in a single category, returning an array of simplified objects.
	get_winners_by_cat: function (tid, callback) {
		//checks that tid is a valid category
		if (tid >= 204 && tid <= 225) {
			this.get_cat_from_tid(tid, function(tid, catName){
				//forming the API endpoint url
				var winnersUrl = 'http://www.pulitzer.org/cms/api/1/winners/cat/' + tid + '/raw.json';
				request({
					url: winnersUrl,
					json: true
				}, function(error, response, body){
					assert.equal(error, null);
					var list = [];
					if (body) {
						body.forEach(function(val, index){
							//compute the year from tid
							var year = 2015 - (val.field_year.und[0].tid - 105);
							// get the citation and publication info, or return "N/A"
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
			//forming the API url
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
	}
};

exports = module.exports = API_CALLS;