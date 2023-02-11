const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');

const port = 3001;
app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
    console.log('Server running on port:', port);
});

// To resolve CORS policy error
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('join_room', (data) => {
        socket.join(data);
        console.log('user joined room: ' + data);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data.content);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
});
