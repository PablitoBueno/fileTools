const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

class CombinePdfsService {
  async combine(inputFilePaths, outputFilename) {
    return new Promise((resolve, reject) => {
      try {
        // Caminho absoluto correto para a pasta outputs
        const outputDir = '/home/Pablito/fileTools/outputs';
        const outputPath = path.join(outputDir, outputFilename);

        // Limpa apenas o arquivo anterior se existir
        if (fs.existsSync(outputPath)) {
          fs.unlinkSync(outputPath);
        }

        // Comando Ghostscript otimizado
        const gsCommand = `gs -dBATCH -dNOPAUSE -q -sDEVICE=pdfwrite -dPDFSETTINGS=/prepress -sOutputFile="${outputPath}" ${inputFilePaths.join(' ')}`;
        
        console.log('Executando:', gsCommand); // Para debug

        exec(gsCommand, (error, stdout, stderr) => {
          if (error) {
            console.error('Erro no Ghostscript:', stderr);
            reject(`Falha ao combinar PDFs: ${error.message}`);
          } else {
            // Verificação robusta do arquivo gerado
            if (fs.existsSync(outputPath) && fs.statSync(outputPath).size > 0) {
              resolve(outputPath);
            } else {
              reject('O arquivo de saída não foi gerado corretamente (tamanho zero)');
            }
          }
        });
      } catch (error) {
        reject(`Erro crítico: ${error.message}`);
      }
    });
  }
}

module.exports = new CombinePdfsService();