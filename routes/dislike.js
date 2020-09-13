const express = require('express');

const router = express.Router();
const dislikeController = require('../controller/dislike_controller');


router.post('/toggle', dislikeController.toggleDislike);


module.exports = router;