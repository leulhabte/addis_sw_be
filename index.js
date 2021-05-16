const mongoose = require('mongoose');
const http = require('http')
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config();

// establish connection to remote mongodb server
mongoose.connect(`mongodb+srv://addis_sw:${process.env.SECRET}@cluster0.tydf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
}).then(()=> console.log('connected...'))
    .catch(err => console.log(err))

// define running port number
const PORT = process.env.PORT || 5000;

// create server
const server = http.createServer(app);

// listen to server on the specified port
server.listen(PORT, ()=> console.log('server running...'))