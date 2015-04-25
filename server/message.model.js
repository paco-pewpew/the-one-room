(function(){
	'use strict';
	
	var mongoose = require('mongoose');

	var messageModel = mongoose.model('Message',{
		sender: {
			type: String,
			required: true
		},
		message: {
			type: String,
			required: true
		},
		time: {
			type: Date,
			required: true
		}
	});
	
	module.exports=messageModel;
})();