'use strict';

const USERS = new Set();

function chatLogic(io) {

	io.on('connection', (socket) => {
		let NAME;

		socket.on('get name', (msg) => {
			if (USERS.has(msg.name)) {
				io.to(socket.id).emit('set name', { free: 'no' });	
			} else {
				socket.join('The One Room');
				NAME = msg.name;
				USERS.add(NAME);
				
				io.to(socket.id).emit('set name', {
					free: 'yes',
					user: NAME,
					current: Array.from(USERS.values())
				});
				
				io.to('The One Room').emit('user joined', {
					user: NAME,
					current: Array.from(USERS.values())
				});
			}
		});

		socket.on('chat message', (msg) => {
				if (msg) {
					io.to('The One Room').emit('chat message', {
						sender: NAME,
						message: msg,
						time: Date.now()
					});
				}
		});

		socket.on('disconnect', () => {
			if (NAME) {
				USERS.delete(NAME);
				
				io.to('The One Room').emit('user left', {
					user: NAME,
					current: Array.from(USERS.values())
				});
			}
		});
		
	});

}

export { chatLogic };
