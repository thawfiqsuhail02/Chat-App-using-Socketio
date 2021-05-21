const express=require('express')
const app=express();
const port =3000;
const sio=require('socket.io');
var io;
app.get('/',(req,res)=>{
	res.sendFile(__dirname+'/index2.html');
});
//app.use(express.static(__dirname+'/public'));
io=sio.listen(app.listen(port));
io.on('connection',(socket)=>{
	console.log(`${socket.handshake.address} connected at ${new Date()}`);
	socket.send('im a server');
	socket.on('message',(data)=>{
		//console.log(data);
		io.sockets.emit('message',data);
	});
	socket.on('disconnect',()=>{
		console.log(`${socket.handshake.address} disconnected at ${new Date()}`);
	});
});
