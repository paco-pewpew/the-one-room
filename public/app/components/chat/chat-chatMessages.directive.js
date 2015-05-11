'use strict';

class ChatMessages {
	constructor() {
		this.bindToController = true;
		this.controller = Controller;
		this.controllerAs = 'vm';
		this.restrict = 'E';
		this.replace = true;
		this.scope = {
			me: '=',
			messages: '=',
			blocked: '='
		};
		this.templateUrl = 'app/components/chat/chat-chatMessages.view.html';
	}

	static factoryFn() {
    return new ChatMessages();
  }
}

class Controller {
	constructor() {
	}

	toggleBlock(user) {
  	if (this.blocked.indexOf(user) === -1) {
  		this.blocked.push(user);
  	} else {
  		this.blocked.splice(this.blocked.indexOf(user), 1);
  	}
  } 

}

export default ChatMessages.factoryFn;
