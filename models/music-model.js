 const Joi=require('joi')
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//structure for schema
const MusicSchema=new Schema({
    name:  String,
    description:String,
    imageUrl:String,
    imgPublic_Id:String
});
// module.exports =mongoose.model('Music',MusicSchema)
 const Music = mongoose.model("Music", MusicSchema);

function validateAgainstErrors(music) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    description: Joi.string().max(255).required()
  });

  return schema.validate(music);
}

exports.Music = Music;
exports.validate = validateAgainstErrors;
