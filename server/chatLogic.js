(function(){
	'use strict';
	var Message=require('./message.model.js');
	var users=[];
	
	module.exports=function(io){

	io.on('connection',function(socket){
			var nameOnSocket;

			socket.on('get name',function(msg){
				if(users.indexOf(msg.name)>=0){
					io.to(socket.id).emit('set name',{free:'no'});	
				}else{
					socket.join('The One Room');
					nameOnSocket=msg.name;
					users.push(nameOnSocket);
					io.to(socket.id).emit('set name',{free:'yes',user:nameOnSocket,current:users});
					io.to('The One Room').emit('user joined',{user:nameOnSocket,current:users});
				}
			});

			socket.on('chat message',function(msg){
					if(msg){
						var fullMessage={sender:nameOnSocket,message:msg,time:Date.now()};
						Message.create(fullMessage,function(err){
							if(err)
								console.log(err);
						});
						io.to('The One Room').emit('chat message',fullMessage);
					}
			});

			socket.on('disconnect',function(){
				//remove name from user lists so it can be used again
				users.splice(users.indexOf(nameOnSocket),1);
				if(nameOnSocket){
					io.to('The One Room').emit('user left',{user:nameOnSocket,current:users});
				}
			});
			
		});

	};
})();
