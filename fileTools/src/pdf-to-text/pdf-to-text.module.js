const express = require('express');
const router = express.Router();
const PdfToTextController = require('./pdf-to-text.controller');

router.post('/extract-text', PdfToTextController.extractText);

module.exports = router;