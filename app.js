var assert = require('assert');
var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');
var API = require('./api_calls');

var writeCSV = function (tid, list, filename) {
	json2csv({data: list}, function(err, csv){
		if (err) {
			console.log(err);
		}
		fs.appendFile(filename, csv, function (err){
			console.log('wrote category ' + tid + ' to ' + filename);
			if(err) throw err;
		});
	});
};

var writeWinnersList = function (tid, body) {
	var list = [];
	var filename = 'winners.csv';
	API.get_cat_from_tid(tid, function(tid, cat){
		body.forEach(function(val, index){
			//compute the year from tid
			var publication, citation, year = 'N/A';
			if ("field_year.und" in val){
				year = API.get_year_from_tid(val.field_year.und[0].tid);
			}
			// get the citation and publication info, or return "N/A"
			if ("field_publication.und" in val){
				publication = val.field_publication.und[0].safe_value;
			}
			if ("field_abbr_citation.und" in val){
				citation = val.field_abbr_citation.und[0].safe_value;
			}
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
	if ("field_years_collection.und" in body){
		var revisions = body.field_years_collection.und;
	};
	revisions.forEach(function(val, index){
		var year, description = "N/A";
		if ("item.field_awards_description.und" in val){
			description = val.item.field_awards_description.und[0].safe_value;
		}
		if ("item.field_years_range.und" in val){
			year = API.get_year_from_tid(val.item.field_years_range.und[0].tid);
		}
		list.push({
			"category": body.name,
			"revNum": index,
			"year": year,
			"description": description,
		});
	});
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