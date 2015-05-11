'use strict';

class UsersSlider {
	constructor() {
		this.bindToController = true,
		this.controller = Controller;
		this.controllerAs = 'vm'; 
		this.restrict = 'E';
		this.replace = true;
		this.scope = {
			me: '=',
			users: '=',
			blocked: '='
		};
		this.templateUrl = 'app/components/chat/chat-usersSlider.view.html';
	}

	static factoryFn() {
    return new UsersSlider();
  }

}

class Controller {
	constructor() {
		this.title = `Hello, ${this.me} !`;
	}

	toggleBlock(user) {
  	if (this.blocked.indexOf(user) === -1) {
  		this.blocked.push(user);
  	} else {
  		this.blocked.splice(this.blocked.indexOf(user), 1);
  	}
  } 

}

export default UsersSlider.factoryFn;
