'use strict';
var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var port=process.env.PORT||1337;

var mongoose=require('mongoose');
var config=require('./config.js');
//if db is set-connect
if(config.db){
	try{
		mongoose.connect(config.db);	
	}catch(err){
		console.log('Error trying to connect to db',err);
	}
}

app.use(express.static(__dirname+'/public'));

require('./server/chatLogic.js')(io);


app.get('*',function(req,res){
	res.sendFile(__dirname+'public/index.html');
});

http.listen(port,function(){
	console.log('the awesomeness is on port'+port);
});