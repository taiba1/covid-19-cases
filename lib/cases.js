const csv = require('fast-csv');
const request = require('request');

const countries = require('./countries');
const Case = require('./database');

function getCases(url, countries) {
	const cases = [];

	csv.parseStream(request(url))
		.on('data', (row) => {
			if (countries.includes(row[3])) {
				cases.push({
					Country: row[3],
					Confirmed: row[7],
					Active: row[10],
					Recoveries: row[9],
					Deaths: row[8],
					UpdatedOn: row[4],
				});
			}
		})
		.on('end', () => {
			console.log('File read successfully....');
		});

	return cases;
}

module.exports = getCases;
