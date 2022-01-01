const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Model = require('./model');
const cors = require('cors');

// convert json into object
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(cors());

// connection to mongoDb
mongoose.connect('mongodb://localhost:27017/portfolio',{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}).then(()=>{
    console.log('connection successful');
}).catch(()=>{
    console.log('connection unsuccessful');
});

app.post('/postProject',(req,res)=>{ 
    let {name,email,password,projectDetails} = req.body;
    let model = new Model({
        name,
        email,
        password,
        projectDetails,
    });
    model.save().then(() => {
        res.status(200).send(true);
    }).catch((error) => {
        console.log(error);
        res.status(404).send(false);
    });
});

// Establish port server
app.listen(8000,()=>{
    console.log('Your port link is - http://localhost:8000/');
})