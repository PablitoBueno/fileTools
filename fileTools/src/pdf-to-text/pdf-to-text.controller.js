const PdfToTextService = require('./pdf-to-text.service');

class PdfToTextController {
  async extractText(req, res) {
    const { filename } = req.body;
    
    if (!filename) {
      return res.status(400).json({ 
        success: false,
        error: 'Nome do arquivo não fornecido' 
      });
    }

    try {
      const result = await PdfToTextService.extractTextFromPDF(filename);
      res.json(result);
    } catch (error) {
      res.status(500).json({ 
        success: false,
        error: error.message 
      });
    }
  }
}

module.exports = new PdfToTextController();