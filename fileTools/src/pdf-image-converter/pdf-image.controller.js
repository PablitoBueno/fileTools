const pdfImageService = require('./pdf-image.service');

exports.pdfToImages = async (req, res) => {
  try {
    const { filename, ...options } = req.body;

    if (!filename) {
      return res.status(400).json({ 
        error: 'Parâmetro "filename" é obrigatório',
        example: { 
          filename: "documento.pdf",
          format: "jpg",
          dpi: 200
        }
      });
    }

    const result = await pdfImageService.pdfToImages(filename, options);
    
    res.json({
      success: true,
      count: result.length,
      images: result.map(item => item.filename),
      message: `PDF convertido para ${options.format || 'png'} com sucesso`
    });

  } catch (error) {
    console.error('Erro no controller:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};