const fs = require('fs');
const path = require('path');
const libre = require('libreoffice-convert');
const { v4: uuidv4 } = require('uuid');
const util = require('util');

const convertAsync = util.promisify(libre.convert);

const inputDir = '/home/Pablito/fileTools/upload';
const outputDir = '/home/Pablito/fileTools/outputs';

exports.pdfToDocx = async (filename) => {
  const inputPath = path.join(inputDir, filename);
  const outputExt = '.docx';
  const outputPath = path.join(outputDir, `${uuidv4()}${outputExt}`);

  const fileBuffer = fs.readFileSync(inputPath);
  const converted = await convertAsync(fileBuffer, outputExt, undefined);
  fs.writeFileSync(outputPath, converted);

  return outputPath;
};

exports.docxToPdf = async (filename) => {
  const inputPath = path.join(inputDir, filename);
  const outputExt = '.pdf';
  const outputPath = path.join(outputDir, `${uuidv4()}${outputExt}`);

  const fileBuffer = fs.readFileSync(inputPath);
  const converted = await convertAsync(fileBuffer, outputExt, undefined);
  fs.writeFileSync(outputPath, converted);

  return outputPath;
};