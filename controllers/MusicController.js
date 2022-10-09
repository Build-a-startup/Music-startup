const _ = require("lodash");
const { Music, validate } = require("../models/music-model");
const asyncHandler = require("express-async-handler");

exports.getSongs = asyncHandler(async (req, res) => {
  res.status(200).send(await Music.find());
});

exports.getMusic = asyncHandler(async (req, res) => {
  const music = await Music.findById(req.params.id);
  if (!music) return res.send('Music Not Found');
  return res.status(200).send(music);
});

exports.postMusic = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let music = new Music(_.pick(req.body, ["name", "description"]));
  music = await Music.Save();
  res.send(200).send(music);
});

exports.updateMusic = asyncHandler(async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.message);
  }
  const music = await Music.findById(req.params.id);
  if (!music) return res.status(404).send("the music doesnot exist");

  const UpdateMusic = await Music.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send(UpdateMusic);
});

exports.deleteSong = asyncHandler(async (req, res) => {
  const DeleteMusic = await Music.findByIdAndRemove(req.params.id);
  if (!DeleteMusic) return res.status(200).send("Music Not found for delete");
   return res.status(200).send("Music Delete successful");
});
