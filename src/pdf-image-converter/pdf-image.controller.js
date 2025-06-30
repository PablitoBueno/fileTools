const pdfImageService = require('./pdf-image.service');
const path = require('path');

module.exports = {
  async pdfToImages(req, res) {
    try {
      const { filename, format, dpi } = req.body;
      
      if (!filename) {
        return res.status(400).json({ error: 'Nome do arquivo é obrigatório' });
      }

      const images = await pdfImageService.pdfToImages(
        filename, 
        format || 'png', 
        dpi || 150
      );

      // Retorna lista de imagens geradas (caminhos relativos)
      const imageNames = images.map(img => path.basename(img));
      res.json({ images: imageNames });

    } catch (error) {
      console.error('Erro no controller (pdfToImages):', error);
      res.status(500).json({ error: error.message });
    }
  },

  async imagesToPdf(req, res) {
    try {
      const { filenames, outputFilename = 'documento.pdf' } = req.body;
      
      if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
        return res.status(400).json({ error: 'Lista de imagens é obrigatória' });
      }

      const pdfPath = await pdfImageService.imagesToPdf(
        filenames, 
        outputFilename
      );

      res.download(pdfPath, outputFilename, (err) => {
        if (err) console.error('Erro no download:', err);
      });

    } catch (error) {
      console.error('Erro no controller (imagesToPdf):', error);
      res.status(500).json({ error: error.message });
    }
  }
};