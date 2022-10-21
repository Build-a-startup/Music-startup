const _ = require("lodash");
const cloudinary=require('../images/cloudinary')
const { Music, validate } = require("../models/music-model");
const asyncHandler = require("express-async-handler");

exports.getAllmusic = asyncHandler(async (req, res) => {
  res.status(200).send(await Music.find());
});

exports.getMusic = asyncHandler(async (req, res) => {
  const music = await Music.findById(req.params.id);
  if (!music) {
    return res.send('Music Not Found')
  }
  return res.status(200).send(music);
});

exports.postMusic = async (req, res) => {
console.log(req.file);
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }

const UploadResult=await cloudinary.uploader.upload(req.file.path)
 let music = new Music(_.pick(req.body, ["name", "description"]))
 console.log(UploadResult);
 music.imageUrl=UploadResult.url;
 music.imgPublic_Id=UploadResult.public_id;
  music = await music.save();
  res.status(201).send(music);
 }

  // let music = new Music(_.pick(req.body, ["name", "description","image"]));})

exports.updateMusic = asyncHandler(async (req, res) => {
  let UploadResult;
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
   const music = await Music.findById(req.params.id);
  if (!music) return res.status(404).send("the music doesnot exist");
   let UpdatedMusic=req.body
  if(req.file){
    UploadResult = await cloudinary.uploader.upload(req.file.path)
    UpdatedMusic.imageUrl=UploadResult.url
    UpdatedMusic.imgPublic_Id=UploadResult.public_Id
  }
  const UpdateMusic = await Music.findByIdAndUpdate(req.params.id,UpdatedMusic, {
    new: true,
  });
  res.status(200).send(UpdateMusic);
});


// cloudinary.v2.uploader.destroy('Asset_2_bdxdsl', function(error,result) {
//   console.log(result, error) })

exports.deleteSong = asyncHandler(async (req, res) => {
  const DeleteMusic = await Music.findByIdAndRemove(req.params.id);
  
  if (!DeleteMusic) {return res.status(200).send("Music Not found for delete");}
  
  await cloudinary.uploader.destroy(DeleteMusic.imgPublic_Id)
   return res.status(200).send("Music Delete successful");
});
