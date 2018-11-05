#!/usr/bin/env node

var request = require('superagent');
var program = require('commander');
var BASE_URL = 'https://platform.devtest.ringcentral.com';
var SUBSCRIPTION_URI = '/restapi/v1.0/subscription';
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

program
    .option('-e, --env <environment>', 'The environment to connect to, either "sandbox" or "production"')
    .option('-d, --delete <delete_id>', 'The subscription to delete')
    .option('-i, --info <info_id>', 'The subscription to get information on')
    .action(function() {
	    var env = db.get('envs').find({ id: program.env });
	    if (program.delete) {
		request
		    .delete(BASE_URL + SUBSCRIPTION_URI + '/' + program.delete)
		    .set('Accept', 'application/json')
		    .set('Authorization', 'Bearer ' + env.get('token'))
		    .end(function (err, res) {
			    console.log("Deleting subscription: ", program.delete);
			    console.log('Response: ', JSON.stringify(res.body, null, 4));
			});
	    } else if (program.info) {
		request
		    .get(BASE_URL + SUBSCRIPTION_URI + '/' + program.info)
		    .set('Accept', 'application/json')
		    .set('Authorization', 'Bearer ' + env.get('token'))
		    .end(function (err, res) {
			    console.log("Getting subscription: ", program.info);
			    console.log('Response: ', JSON.stringify(res.body, null, 4));
			});
	    } else {
		request
		    .get(BASE_URL + SUBSCRIPTION_URI)
		    .set('Accept', 'application/json')
		    .set('Authorization', 'Bearer ' + env.get('token'))
		    .end(function (err, res) {
			    if (!err && res.ok) {
				console.log('Current Subscriptions: ', JSON.stringify(res.body, null, 4));
				process.exit(0);
			    } else {
				var errorMessage;
				if (res && res.status === 401) {
				    errorMessage = "Authentication failed!";
				} else if (err) {
				    errorMessage = err;
				} else {
				    errorMessage = res.text;
				}
				console.error(errorMessage);
				process.exit(1);
			    }
			});
	    }
	})
    .parse(process.argv);