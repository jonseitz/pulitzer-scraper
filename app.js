var express = require('express');
var assert = require('assert');
var request = require('request');
var fs = require('fs');
var json2csv = require('json2csv');
var API = require('./api_calls');

var fields = ['category', 'year', 'title', 'publication', 'citation'];
var allWinners = [];
var tid = 204;
while(tid >= 204 && tid <= 225){
	API.get_winners_by_cat(tid, function(list){
		json2csv({data: list, fields: fields}, function(err, csv){
			if (err) console.log(err);
			fs.appendFile('winners.csv', csv, function (err){
				if(err) throw err;
			});
		});

	});
	tid += 1;
	console.log('category ' + tid + ' saved');	
}