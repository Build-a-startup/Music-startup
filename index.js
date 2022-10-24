require("dotenv").config();

const express=require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const app=express();
const multer = require('multer');

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());




const fileFilter = (req, file, cb) => {
    file.mimetype.startsWith('image') 
    ? cb(null, true)
    : cb(null, false)
};
app.use(
  multer({ storage: multer.diskStorage({}), fileFilter: fileFilter }).single('image')
);

app.get('/test',(req,res,next)=>{
  res.json(req.file)
})
app.use(require('./routes/music-route.js'))
app.use(require("./middlware/global-middleware"));

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



