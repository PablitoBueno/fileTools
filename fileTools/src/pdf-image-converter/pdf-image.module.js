const express = require('express');
const router = express.Router();
const controller = require('./pdf-image.controller');

// Rota correta para conversão PDF para imagens
router.post('/pdf-to-images', controller.pdfToImages);

module.exports = router;