const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//structure for schema
const PhoneSchema=new Schema({
    name:String,
    price:String,
    color:String,
    made:String,
    description:String,
});
//create model
module.exports =mongoose.model('Phone',PhoneSchema);
