var assert = require('assert');
var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');
var API = require('./api_calls');

var writeCSV = function (tid, list, filename) {
	if (list instanceof Array && list.length > 0){
		json2csv({data: list}, function(err, csv){
			if (err) {
				console.log(err);
			}
			fs.appendFile(filename, csv, function (err){
				console.log('wrote category ' + tid + ' to ' + filename);
				if(err) throw err;
			});
		});
	}
};

var writeWinnersList = function (tid, body) {
	var list = [];
	var filename = 'winners.csv';
	API.get_cat_from_tid(tid, function(tid, cat){
		body.forEach(function(val, index){
			//compute the year from tid
			var publication, citation, year = 'N/A';
			try {
				year = API.get_year_from_tid(val.field_year.und[0].tid);
			}
			catch (e){};
			// get the citation and publication info, or return "N/A"
			try {
				publication = val.field_publication.und[0].safe_value;
			}
			catch (e){};
			try {
				citation = val.field_abbr_citation.und[0].safe_value;
			}
			catch (e){};
			//console.log(cat.name + ',' + year + ',' + val.type + ',' + val.title + ',' + publication + ',' + citation);
			list.push({
				"category": cat.name,
				"year": year,
				"type": val.type,
				"title": val.title,
				"publication": publication,
				"citation": citation
			});
			if (index == 0 && val.type + 's.csv' != filename){
				filename = val.type + 's.csv';
			}
		});
		writeCSV(tid, list, filename);
	});
};

var writeRevisionList = function (tid, body) {
	var list = [];
	var fields = ['category', 'revNum', 'year', 'description'];
	var filename = 'revisions.csv';
	var revisions = [];
	try {
		revisions = body.field_years_collection.und;
	}
	catch (e){};
	if (revisions instanceof Array){
		revisions.forEach(function(val, index){
			var year, description = "N/A";
			try {
				description = val.item.field_awards_description.und[0].safe_value;
			}
			catch (e){};
			try {
				year = API.get_year_from_tid(val.item.field_years_range.und[0].tid);
			}
			catch(e){};
			list.push({
				"category": body.name,
				"revNum": index,
				"year": year,
				"description": description,
			});
		});
	};
	writeCSV(tid, list, filename);
};

//setting initial tid value to 204 (lowest category value)
var tid = 204;

//loop through tid values from 204 to 225, then from 260 to 278  (highest category value)
//write separate csv files for winners, finalist, and revisions to categories.
//Write winners 
while(tid >= 204 && tid <= 278){
	API.get_winners_by_cat(tid, writeWinnersList);
	API.get_finalists_by_cat(tid, writeWinnersList);
	API.get_cat_from_tid(tid, writeRevisionList);
	if (tid == 225) {
		tid = 260;
	}
	else{
		tid += 1;
	}
}

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