
require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');//razbireat cookie i dodaet k obekty req.cookies
const bodyParser = require('body-parser');//pomogaet razbiratb telo zaprosa
const compression = require('compression');//shimanie danih
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router/index');
const users = require('./router/users');
app.use(express.json());
app.use(cors({
    credentials:true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server start port: ${PORT}`);
})
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on('error',(error:Error)=>console.log(error));

app.use('/',router,users);


