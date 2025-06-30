const express = require('express');
const router = express.Router();
const controller = require('./pdf-image.controller');

router.post('/pdf-to-images', express.json(), controller.pdfToImages);
router.post('/images-to-pdf', express.json(), controller.imagesToPdf);

module.exports = router;