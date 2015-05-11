'use strict';

import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { chatLogic } from './server/chatLogic.js';

function run() {
	const APP = express();
	const HTTP = http.Server(APP);
	const IO = socketio(HTTP);
	const PORT = process.env.PORT || 1337;

	APP.use(express.static(__dirname + '/public'));
	APP.use(express.static(__dirname + '/node_modules'));

	chatLogic(IO);

	APP.get('*', function(req, res) {
		res.sendFile(__dirname + 'public/index.html');
	});

	HTTP.listen(PORT, function() {
		console.log('the awesomeness is on port' + PORT);
	});
	
}

export { run };
