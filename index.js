'use strict';

const fs = require('fs');

const ACCESS_LOG = './access.log';
const firstIp = '34.48.240.111';
const secondIp = '89.123.1.41';

const readStream = fs.createReadStream(ACCESS_LOG, 'utf-8');
const writeableStreamFirstIp = fs.createWriteStream(firstIp+"_requests.log");
const writeableStreamSecondIp = fs.createWriteStream(secondIp+"_requests.log");

readStream.on('data', (data) => {
	const stringArray = data.split('\n');
	stringArray.forEach((item) => {
		if(item.match(firstIp)) {
			writeableStreamFirstIp.write(item + '\n');
		}
		if(item.match(secondIp)) {
			writeableStreamSecondIp.write(item + '\n');
		}
	});
});