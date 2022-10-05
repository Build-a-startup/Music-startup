const express=require('express');
const router= express.Router();
const { body } = require('express-validator/check');
// const liberary=require('../models/liberarySchema');
const phone=require('../controllers/phones');

router.get('/phones',phone.getPhones);
   
router.post('/phone',[
    body('name').trim().isLength({ min: 5 }),
    body('price').trim().isNumeric().isLength({min:1}),
    body('color').trim().isAlphanumeric(),
    
],phone.postPhone)
router.get('/phone/:id',phone.getPhone);
router.put('/phone/:id',[
    body('name').trim().isLength({ min: 5 }),
    body('price').trim().isNumeric().isLength({min:1}),
    body('color').trim().isAlphanumeric(),
],phone.updatePhone)
router.delete('/phone/:id',phone.deletePhone)


module.exports=router;
 


