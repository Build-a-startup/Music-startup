const express=require('express');
const router= express.Router();
const music=require('../controllers/MusicController');


router.get('/songs',music.getSongs)
router.post('/music',music.postMusic)
router.get('/music/:id',music.getMusic)
router.put('/music/:id',music.updateMusic)
router.delete('/music/:id',music.deleteSong)


module.exports=router;
 


