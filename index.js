require("dotenv").config();
const express=require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const app=express();

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use(require('./routes/music-route.js'))
app.use(require("./middlware/globalMiddleware"));

const port=process.env.PORT;
mongoose.connect(process.env.db)
.then((result)=>{
  app.listen(port,()=>{
    console.log( `the sever run in ${port}`);
  })
})
.catch((err)=>{
  console.log(err);
});



app.use((req, res, next) => {
      res.status(404).send("Sorry can't find that!")
})