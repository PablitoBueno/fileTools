const express = require('express');
const router = express.Router();
const controller = require('./combine-pdfs.controller');

router.post('/combine', express.json(), controller.combine);
module.exports = router;