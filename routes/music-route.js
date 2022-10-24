const express=require('express');
const router= express.Router();
const music=require('../controllers/music-controller');


router.get('/music',music.getAllmusic)
router.post('/music',music.postMusic)
router.get('/music/:id',music.getMusic)
router.put('/music/:id',music.updateMusic)
router.delete('/music/:id',music.deleteSong)


module.exports=router;
 


