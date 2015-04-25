(function() {
    'use strict';

    angular
        .module('theOneRoom')
        .controller('ChatCtrl', ChatCtrl);

    /* @ngInject */
    function ChatCtrl(Socketio) {
        var vm = this;
        vm.chatVisible=true;
        vm.unseenMessages=0;
        vm.formUsername='';
        vm.formMessage='';
        vm.username='';
        vm.blockedUsers=[];
        vm.currentUsers=[];
        vm.messages=[];

        vm.setName=setName;
        vm.sendMessage=sendMessage;
        vm.toggleBlock=toggleBlock;
        vm.toggleChat=toggleChat;
        
        vm.errors={
        	name:false,
        	message:false,
        };

        ////////////////

        function setName(){
			Socketio.emit('get name',{name:vm.formUsername});
		}

		function sendMessage(){
			if(vm.formMessage){
				Socketio.emit('chat message',vm.formMessage);
				vm.formMessage='';	
			}
		}

		function toggleBlock(user){
			if(vm.blockedUsers.indexOf(user)===-1){
				vm.blockedUsers.push(user);
			}else{
				vm.blockedUsers.splice(vm.blockedUsers.indexOf(user),1);
			}
		}

		function toggleChat(){
			vm.chatVisible=!vm.chatVisible;
			if(vm.chatVisible) vm.unseenMessages=0;
		}

        Socketio.on('set name',function(msg){
			if(msg.free==='no'){
				vm.errors.name=true;
			}else{
				vm.errors.name=false;
				vm.username=msg.user;
				vm.currentUsers=msg.current;
			}
		});

		Socketio.on('chat message',function(msg){
			vm.messages.push(msg);
			vm.unseenMessages+=(vm.chatVisible?0:1);
		});

		Socketio.on('user joined',function(msg){
			vm.currentUsers=msg.current;
		});

		Socketio.on('user left',function(msg){
			vm.currentUsers=msg.current;
		});

    }
})();