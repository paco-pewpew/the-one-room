'use strict';

const SOCKET = new WeakMap();
const ACTIVATE = new WeakMap();

class ChatCtrl {
	constructor(socketFactory) {
		this.chatVisible = true;
		this.unseenMessages = 0;
		this.formUsername = '';
		this.formMessage = '';
		this.username = '';
		this.currentUsers = [];
		this.blockedUsers = [];
		this.messages = [];
		this.errors = {
			name: false,
			message: false,
		};
		SOCKET.set(this,socketFactory);
		ACTIVATE.set(this, () => {
		  SOCKET.get(this).on('set name', (msg) => {
		  	if (msg.free === 'no') {
		  		this.errors.name = true;
		  	} else {
		  		this.errors.name = false;
		  		this.username = msg.user;
		  		this.currentUsers = msg.current;
		  	}
		  });

		  SOCKET.get(this).on('chat message', (msg) => {
		  	this.messages.push(msg);
		  	this.unseenMessages += (this.chatVisible? 0: 1);
		  });

		  SOCKET.get(this).on('user joined', (msg) => this.currentUsers = msg.current);

		  SOCKET.get(this).on('user left', (msg) => this.currentUsers = msg.current);
		});

		ACTIVATE.get(this)();
	}

  setName() {
  	SOCKET.get(this).emit('get name', { name: this.formUsername });
  }

  sendMessage() {
  	if (this.formMessage) {
  		SOCKET.get(this).emit('chat message', this.formMessage);
  		this.formMessage = '';
  	}
  }

  toggleChat() {
  	this.chatVisible = !this.chatVisible;
  	if (this.chatVisible) this.unseenMessages = 0;
  }
}

ChatCtrl.$inject = ['socketFactory'];

export default ChatCtrl;
