'use strict';
import Socketio from './shared/socketio.factory.js';
import ChatCtrl from './components/chat/chat.controller.js';
import UsersSlider from './components/chat/chat-usersSlider.directive.js';
import ChatMessages from './components/chat/chat-chatMessages.directive.js';

angular
	.module('theOneRoom', [
		'ngAnimate',
		'ngTouch',
		'luegg.directives'
	])
	.factory('socketFactory', Socketio)
	.directive('usersSlider', UsersSlider)
	.directive('chatMessages', ChatMessages)
	.controller('ChatCtrl', ChatCtrl);
