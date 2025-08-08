const fs = require('fs').promises;
const path = require('path');
const pdf = require('pdf-parse');

class PdfToTextService {
  constructor() {
    this.uploadDir = '/home/Pablito/fileTools/upload';
    this.outputDir = '/home/Pablito/fileTools/outputs';
  }

  async extractTextFromPDF(filename) {
    const filePath = path.join(this.uploadDir, filename);
    
    try {
      // Verifica se o arquivo existe
      await fs.access(filePath);
      
      // Processa o PDF
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdf(dataBuffer);
      
      // Gera nome do arquivo de saída
      const outputFilename = `${path.parse(filename).name}.txt`;
      const outputPath = path.join(this.outputDir, outputFilename);
      
      // Salva o resultado
      await fs.writeFile(outputPath, data.text);
      
      return {
        success: true,
        message: 'Texto extraído com sucesso!',
        outputPath: outputPath
      };
    } catch (error) {
      throw new Error(`Erro ao processar o arquivo: ${error.message}`);
    }
  }
}

module.exports = new PdfToTextService();