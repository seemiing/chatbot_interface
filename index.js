const express = require('express');
const path = require('path');
const { Server } = require('socket.io')
const axios = require('axios');

const app = express();
const http = require('http').createServer(app)
const io = new Server(http);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})


io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('msg', (data) => {
        axios.post('http://localhost:5005/webhooks/rest/webhook', {
            "sender": "test_user",
            "message": data,
        }).then(res => {
            res.data.forEach(reply => {
                if (reply.text == null){
                    socket.emit('replyImg', reply.image);
                    console.log(reply.image);
                }else{
                socket.emit('reply', reply.text);
                }
            });

        })

    })
})
http.listen(process.env.PORT || 4090);