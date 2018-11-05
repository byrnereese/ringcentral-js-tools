#!/usr/bin/env node

var co = require('co'); 
var prompt = require('co-prompt');
var program = require('commander');
const low = require("lowdb");
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ 
	"envs" : [
		  { id: 'sandbox', token: '', client_id: '', client_secret: '' },
		  { id: 'production', token: '', client_id: '', client_secret: '' }
		  ]}).write();

program
    .option('-e, --env <environment>', 'The environment you are configuring, either "sandbox" or "production"')
    .action(function() {
	    co(function *() {
		    console.log( program.env );
		    if (program.env) {
			var token = yield prompt('OAuth Token: ');
			var client_id = yield prompt('Client ID: ');
			var client_secret = yield prompt('Client Secret: ');
			var env = db.get('envs').find({ id: program.env });
			env
			    .set('token',token)
			    .set('client_id',client_id)
			    .set('client_secret',client_secret)
			    .write();
			process.exit(0);
		    } else {
			console.log("No environment specified.");
			process.exit(1);
		    }
		})
      })
    .parse(process.argv);