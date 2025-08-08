const combinePdfsService = require('./combine-pdfs.service');
const fs = require('fs');
const path = require('path');

module.exports = {
  async combine(req, res) {
    try {
      // Validação rigorosa
      if (!req.body.filenames || !Array.isArray(req.body.filenames) || req.body.filenames.length < 2) {
        return res.status(400).json({ error: 'Envie uma lista com pelo menos 2 nomes de arquivos PDF.' });
      }

      // Caminho absoluto correto para a pasta upload
      const uploadDir = '/home/Pablito/fileTools/upload';
      
      // Processa cada arquivo
      const filePaths = [];
      for (const filename of req.body.filenames) {
        const safeFilename = path.basename(filename); // Segurança contra path injection
        const filePath = path.join(uploadDir, safeFilename);
        
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ error: `Arquivo não encontrado: ${safeFilename}` });
        }
        
        if (path.extname(filePath).toLowerCase() !== '.pdf') {
          return res.status(400).json({ error: `O arquivo ${safeFilename} não é um PDF válido` });
        }
        
        filePaths.push(filePath);
      }

      // Nome do arquivo de saída
      const outputFilename = "combinado.pdf";
      const outputPath = await combinePdfsService.combine(filePaths, outputFilename);

      // Envia o arquivo
      res.download(outputPath, outputFilename, (err) => {
        if (err) console.error('Erro no download:', err);
      });

    } catch (error) {
      console.error('Erro no controller:', error);
      res.status(500).json({ 
        error: error.message || 'Erro interno',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
    }
  }
};