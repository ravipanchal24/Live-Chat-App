const express = require('express');
const app = express();
const socket = require('socket.io');
const cors = require('cors');
const path = require('path');

app.get('/', (req, res) => {
    // Server will send GeeksforGeeks as response
    res.send("Server up and running");
})

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const server = app.listen(PORT, () => {
    console.log('Server running on port:', PORT);

});


if (process.env.NODE_ENV === 'production') {
    // Set static folder i.e. client > 'build' folder {after running 'npm run build' react for production }
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))); // to direct server to load index.html file when running in production 
}

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
        console.log(data.content);
        socket.to(data.room).emit("receive_message", data.content);
    })

    socket.on("user_typing", (data) => {
        socket.to(data.room).emit("other_user_typing", data.sentence);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    })
    1
});
