const service = require('./pdf-to-docx.service');

exports.convertPdfToDocx = async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'O nome do arquivo é obrigatório.' });
  }

  try {
    const outputPath = await service.pdfToDocx(filename);
    res.json({ message: 'Conversão concluída.', output: outputPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro na conversão de PDF para DOCX.' });
  }
};

exports.convertDocxToPdf = async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res.status(400).json({ error: 'O nome do arquivo é obrigatório.' });
  }

  try {
    const outputPath = await service.docxToPdf(filename);
    res.json({ message: 'Conversão concluída.', output: outputPath });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro na conversão de DOCX para PDF.' });
  }
};
