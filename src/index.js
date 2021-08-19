require('./models/User.js');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');


const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://rockzsuraj:Hello@234@cluster0.25jhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex:true
});
mongoose.connection.on('connected', ()=>{
console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err)=>{
    console.log('Error connecting to mongo', err);
    });

app.get('/',requireAuth,(req,res)=> {
res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})