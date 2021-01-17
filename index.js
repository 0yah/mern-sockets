const app = require('express')()
const http = require('http').createServer(app);
const mongoose = require('mongoose');

const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
    /*
    Fixes CORS error on the frontend
    */
});
let interval;

app.get("/", (req, res) => {
    res.send('Sockets with Express and React');

});






io.use((socket, next) => {
    //Use this to check the auth token before accepting a connection from a client
    console.log(socket.handshake.query.token)
    next()
}).on("connection", (socket) => {
    // console.log("New client connected");
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("disconnect", () => {
        //  console.log("Client disconnected");
        clearInterval(interval);
    });
});


const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};


mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Successfully connected to the database')
});

http.listen(4000, function () {
    console.log('listening on port 4000')
})

