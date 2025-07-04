const express = require('express');
const router = express.Router();
const controller = require('./pdf-to-docx.controller');

router.post('/pdf-to-docx', controller.convertPdfToDocx);
router.post('/docx-to-pdf', controller.convertDocxToPdf);

module.exports = router;
