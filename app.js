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
	API.get_winners_by_cat(tid, function(list){
		json2csv({data: list, fields: fields}, function(err, csv){
			if (err) console.log(err);
			//output to 'winners.csv' file
			fs.appendFile('winners.csv', csv, function (err){
				if(err) throw err;
			});
		});

	});
	console.log('category ' + tid + ' saved');	
	if (tid == 225) {
		tid = 260;
	}
	else{
		tid += 1;
	}
}


/*
// logs a list of tid: category relationships
// I used it while developing. Uncomment if you want to test yourself.

while (tid >= 204 && tid <= 278){
	API.get_cat_from_tid(tid, function(tid, name){
		console.log(tid+': '+name);
	});
	if (tid == 226) {
		tid = 260;
	}
	else{
		tid += 1;
	}
};
*/