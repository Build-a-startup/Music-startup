const bodyParser = require('body-parser');
// require("dotenv").config();//port
const express=require('express');
// const path=require('path')
const app=express();
// const database = require("./config/db");
//  database();
const phonesRoute=require('./routes/phones')


//to use the post request
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({extended:true}));


//routes
app.use(phonesRoute)



//want add fun middlware.....................
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});


// app.use(require("./middelware/globalmiddelware"));
// app.use('/',(req,res)=>{
//     res.send('hii');
//     console.log('hiiii');
// })


// connect with database mongo 
const port=3000;
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://max:10112000@cluster0.osssgq1.mongodb.net/?retryWrites=true&w=majority')
// function da5el el () named call back function
.then((result)=>{
  app.listen(port,()=>{
    console.log("the local host of seerver is  http://localhost:${port}");
  });
})
.catch((err)=>{
  console.log(err);
})

app.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!")
    })
 

