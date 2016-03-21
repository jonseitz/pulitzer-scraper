var assert = require('assert');
var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');
var API = require('./api_calls');

var fields = ['category', 'year', 'title', 'publication', 'citation'];
var allWinners = [];

//setting initial tid value to 204 (lowest category value)
var tid = 204;


//loop through tid values from 204 to 225, then from 260 to 278  (highest category value)
while(tid >= 204 && tid <= 278){
	API.get_winners_by_cat(tid, function(tid, body){
		var list = [];
		API.get_cat_from_tid(tid, function(tid, cat){
			body.forEach(function(val, index){
				//compute the year from tid
				var publication, citation, year = 'N/A';
				if (val.field_year.und){
					year = API.get_year_from_tid(val.field_year.und[0].tid);
				}
				// get the citation and publication info, or return "N/A"
				if (val.field_publication.und){
					publication = val.field_publication.und[0].safe_value;
				}
				if (val.field_abbr_citation.und){
					citation = val.field_abbr_citation.und[0].safe_value;
				}				
				list.push({
					"category": cat.name,
					"year": year,
					"title": val.title,
					"publication": publication,
					"citation": citation
				});
			});
			json2csv({data: list, fields: fields}, function(err, csv){
				if (err) console.log(err);
				//output to 'winners.csv' file
				fs.appendFile('winners.csv', csv, function (err){
					if(err) throw err;
				});
			});
		});
	});
	if (tid == 225) {
		tid = 260;
	}
	else{
		console.log('category ' + tid + ' saved');	
		tid += 1;
	}
}


//get list of finalists

//get list of revisions to all of the category descriptions





/*
// writes a list of tid: category relationships to 'categories.txt';
// I used it while developing. Uncomment if you want to test yourself.

while (tid >= 204 && tid <= 278){
	API.get_cat_from_tid(tid, function(tid, cat){
		var line = 'tid: ' + cat.name;
		fs.appendFile('categories.txt', line, function(err){
			if (err) throw err;
			console.log('saved category ' + tid);
		});
	});
	if (tid == 226) {
		tid = 260;
	}
	else{
		tid += 1;
	}
};

*/