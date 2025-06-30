const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Promisify para facilitar
const execPromise = util.promisify(exec);

// Caminhos absolutos fixos
const UPLOAD_DIR = '/home/Pablito/fileTools/upload';
const OUTPUT_DIR = '/home/Pablito/fileTools/outputs';

class PdfImageService {
  async pdfToImages(filename, format = 'png', dpi = 150) {
    try {
      // Validações
      if (!['png', 'jpg', 'jpeg'].includes(format)) {
        throw new Error('Formato inválido. Use: png, jpg ou jpeg');
      }

      const inputPath = path.join(UPLOAD_DIR, path.basename(filename));
      const outputPrefix = `page_`;
      const outputPath = path.join(OUTPUT_DIR, outputPrefix);

      // Verifica arquivo de entrada
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Arquivo não encontrado: ${inputPath}`);
      }

      // Comando Ghostscript para PDF -> Imagens
      const cmd = `gs -dNOPAUSE -dBATCH -q -sDEVICE=${format} -r${dpi} -sOutputFile="${outputPath}%d.${format}" "${inputPath}"`;
      
      await execPromise(cmd);

      // Lista as imagens geradas
      const images = fs.readdirSync(OUTPUT_DIR)
        .filter(file => file.startsWith(outputPrefix) && file.endsWith(`.${format}`))
        .map(file => path.join(OUTPUT_DIR, file));

      if (images.length === 0) throw new Error('Nenhuma imagem foi gerada');

      return images;

    } catch (error) {
      throw new Error(`PDF para Imagem falhou: ${error.message}`);
    }
  }

  async imagesToPdf(filenames, outputFilename) {
    try {
      // Converte nomes para caminhos absolutos
      const inputPaths = filenames.map(name => 
        path.join(UPLOAD_DIR, path.basename(name))
      );

      // Verifica arquivos
      for (const filePath of inputPaths) {
        if (!fs.existsSync(filePath)) {
          throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
      }

      const outputPath = path.join(OUTPUT_DIR, outputFilename);
      const tempListPath = path.join(OUTPUT_DIR, 'temp_images.txt');

      // Cria lista de arquivos para o ImageMagick
      fs.writeFileSync(tempListPath, inputPaths.join('\n'));

      // Comando ImageMagick para Imagens -> PDF
      const cmd = `convert @${tempListPath} "${outputPath}"`;
      
      await execPromise(cmd);

      // Limpa lista temporária
      fs.unlinkSync(tempListPath);

      // Verifica resultado
      if (!fs.existsSync(outputPath) || fs.statSync(outputPath).size === 0) {
        throw new Error('Falha ao gerar PDF');
      }

      return outputPath;

    } catch (error) {
      throw new Error(`Imagem para PDF falhou: ${error.message}`);
    }
  }
}

module.exports = new PdfImageService();