const path = require('path');
const http = require('http')
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const formatMessage = require('./utility/formatMessage');
const {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
} = require('./utility/user')
const chatbot = "chatbot";
app.use(express.static(path.join(__dirname, "public")));

io.on('connection'  , socket => {
    socket.on("JoinRoom" , ({username , channel}) => {
        const user = userJoin(socket.id , username ,channel);
        socket.join(user.channel)
        socket.
        broadcast.
        to(user.channel).
        emit('message' , formatMessage(chatbot,`${username} joined the chat `));
        io.to(user.channel).emit("roomUsers", {
            channel :user.channel,
            users : getRoomUsers(user.channel)
        })

    })


    socket.on('disconnect'  ,() => {
        const user = userLeave(socket.id);
        if(user){
            io.emit('message', formatMessage(chatbot,`${user.username} has left the chat`));
            io.to(user.channel).emit("roomUsers", {
                channel :user.channel,
                users : getRoomUsers(user.channel)
            })
        }

    })
    socket.on("chatMessage" ,message => {
        const user = getCurrentUser(socket.id);
        io.to(user.channel).emit("message",formatMessage(user.username,message))

    })
})

const PORT = 3000 || process.env.PORT

server.listen(PORT , () => console.log(`server running on PORT ${PORT}`));

