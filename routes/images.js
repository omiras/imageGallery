const express = require('express');

const router = express.Router();

const imagesController = require('../controllers/images');

router.get('/', imagesController.getImages);

router.get('/add-new', imagesController.addImage);
router.post('/add-new', imagesController.addImagePost);

module.exports = router;