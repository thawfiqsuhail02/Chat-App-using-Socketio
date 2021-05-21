const express=require('express')
const app=express()
const port=3000;
const path=require('path')
const socketio=require('socket.io')
var io;

app.get('/',(req,res)=>{
	res.sendFile(path.join(__dirname+'/index.html'));
})

io=socketio.listen(app.listen(port,(req,res)=>{
	console.log('Server is Running');
}))

//event handling using io object 
io.on('connection',(socket)=>{
	console.log(`${socket.handshake.address} connected at ${new Date()}`);
	socket.emit('smessage',"This is server side message");
	setTimeout(function(){socket.emit('stimeout',"Timeout Function is emmited");},5000);
	socket.on('cmessage',(data)=>{
		console.log(data);
	})
	socket.on('disconnect',()=>{
		console.log(`${socket.handshake.address} disconnected at ${new Date()}`);
	})
});
