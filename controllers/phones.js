const { validationResult } = require('express-validator/check');
const _ = require("lodash");
const Phone=require('../models/phones')
exports.getPhones=(req,res)=>{
  Phone.find()
  .then(result=>{
    if(!result){
        const error=new Error('not found the phone')
         error.statusCode=404;
         throw error;
    }
    res.json(result);
  }) .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
exports.postPhone=(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    let phone = new Phone(
        _.pick(req.body, ["name", "price", "color", "made","description"])
      );
    // const phone=new Phone({
    //     name:req.body.name,
    //     price:req.body.price,
    //     color:req.body.color,
    //     made:req.body.made,
    //     description:req.body.description  
        
    // })
  
    phone.save()
    .then(product=>{
        res.json({product});
    }) .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}
exports.getPhone=(req,res)=>{
    const phoneId = req.params.id;
    Phone.find({_id : mongoose.Types.ObjectId(phoneId)})
    .then(result=>{
        if(!result){
            const error=new Error('the phone noy found');
             error.statusCode=404;
             throw error
        }
       res.send(result)
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
}
exports.updatePhone=(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    Phone.findById(req.params.id)
    .then(result=>{
        if(result = []){
            res.send("the phone not found");
        }
    })
     Phone.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
        ).then(result=>{
            res.status(201).send(result);
        })
        .catch(err=>{
            console.log(err);
        })
   

      
}
exports.deletePhone=(req,res)=>{
   
  

     Phone.findByIdAndRemove(req.params.id)
    .then(phone=>{
        if (!phone) 
        return res.status(404).send("the phone not not not found");
    })
    .then(result => {
        res.status(200).json({ message: 'Deleted post.' });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });

  
}