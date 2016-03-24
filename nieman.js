var fs = require('fs');
var assert = require('assert');
var csv = require('csv-parser');
var json2csv = require('json2csv');

var list = [];

fs.createReadStream('nieman-fellows.csv')
	.pipe(csv())
	.on('data', function(fellow){
		fs.createReadStream('winners.csv')
			.pipe(csv())
			.on('data', function(prize){
				for (var field in prize){
					//checks to see if last name and either given or perferred name matches any fields in the prize list
					if (prize[field].search(fellow.LAST) != -1 && prize[field].search(fellow.FIRST) != -1) {
						prize.fellow = fellow['FULL NAME'];
						prize.NF = fellow.YEAR;
						json2csv({data: prize}, function(err, csv){
							if (err) {
								console.log(err);
							}
							csv = csv.replace('"category","year","type","title","publication","citation","fellow","NF"', '');
							csv = csv.replace('\\n', '');
							console.log(csv);
							fs.appendFile('nieman-winners.csv', csv, function (err){
								console.log('Found winner: ' + fellow['FULL NAME']);
								if(err) throw err;
							});
						});
					}
				}
			});
			fs.createReadStream('finalists.csv')
			.pipe(csv())
			.on('data', function(prize){
				for (var field in prize){
					//checks to see if last name and either given or perferred name matches any fields in the prize list
					if (prize[field].search(fellow.LAST) != -1 && prize[field].search(fellow.FIRST) != -1) {
						prize.fellow = fellow['FULL NAME'];
						prize.NF = fellow.YEAR;
						json2csv({data: prize}, function(err, csv){
							if (err) {
								console.log(err);
							}
							csv = csv.replace('"category","year","type","title","publication","citation","fellow","NF"', '');
							csv = csv.replace('\\n', '');
							console.log(csv);
							fs.appendFile('nieman-finalists.csv', csv, function (err){
								console.log('Found finalist: ' + fellow['FULL NAME']);
								if(err) throw err;
							});
						});
					}
				}
			});	
		});