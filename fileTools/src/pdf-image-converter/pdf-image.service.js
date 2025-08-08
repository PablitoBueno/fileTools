const { exec } = require('child_process');
const util = require('util');
const fs = require('fs');
const path = require('path');

const execPromise = util.promisify(exec);

// Caminhos absolutos FIXOS
const UPLOAD_DIR = '/home/Pablito/fileTools/upload';
const OUTPUT_DIR = '/home/Pablito/fileTools/outputs';

class PdfImageService {
  async pdfToImages(filename, options = {}) {
    try {
      // Configurações padrão
      const {
        format = 'png',
        dpi = 150,
        prefix = 'page_'
      } = options;

      // Validações
      if (!['png', 'jpg', 'jpeg'].includes(format)) {
        throw new Error('Formato inválido. Use: png, jpg ou jpeg');
      }

      const inputPath = path.join(UPLOAD_DIR, filename);
      const outputPattern = path.join(OUTPUT_DIR, `${prefix}%d.${format}`);

      // Verificação do arquivo
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Arquivo não encontrado: ${filename}`);
      }

      // Mapeamento CORRETO dos dispositivos Ghostscript
      const devices = {
        png: 'png16m',    // PNG colorido de 16 milhões de cores
        jpg: 'jpeg',      // Dispositivo JPEG
        jpeg: 'jpeg'      // Dispositivo JPEG
      };

      const device = devices[format];
      if (!device) {
        throw new Error(`Dispositivo não suportado para o formato: ${format}`);
      }

      // Comando Ghostscript corrigido
      const gsCommand = `gs -dNOPAUSE -dBATCH -q ` +
                       `-sDEVICE=${device} ` +
                       `-r${dpi} ` +
                       `-dTextAlphaBits=4 ` +
                       `-dGraphicsAlphaBits=4 ` +
                       `-sOutputFile="${outputPattern}" "${inputPath}"`;

      console.log(`Executando: ${gsCommand}`);
      
      // Executa o comando
      const { stderr } = await execPromise(gsCommand);
      if (stderr) console.warn('Avisos do Ghostscript:', stderr);

      // Lista as imagens geradas
      const generatedFiles = fs.readdirSync(OUTPUT_DIR)
        .filter(file => file.startsWith(prefix) && file.endsWith(`.${format}`))
        .map(file => ({
          filename: file,
          path: path.join(OUTPUT_DIR, file)
        }));

      if (generatedFiles.length === 0) {
        throw new Error('Nenhuma imagem foi gerada. Verifique o arquivo PDF.');
      }

      return generatedFiles;

    } catch (error) {
      console.error('Erro no serviço:', error);
      throw new Error(`PDF para imagem falhou: ${error.message}`);
    }
  }
}

module.exports = new PdfImageService();