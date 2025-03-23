import { Injectable, BadRequestException } from '@nestjs/common';
import { exec } from 'child_process';
import * as path from 'path';

@Injectable()
export class ConversionPdfDocService {

  async convertPdfToDoc(pdfPath: string): Promise<string> {
    const outputDir = path.dirname(pdfPath);
    const outputFileName = `converted-${Date.now()}.docx`;
    const outputPath = path.join(outputDir, outputFileName);

    const command = `libreoffice --headless --convert-to docx --outdir ${outputDir} ${pdfPath}`;
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(new BadRequestException('Erro ao converter PDF para DOC.'));
        }
        resolve(outputPath);
      });
    });
  }

  async convertDocToPdf(docPath: string): Promise<string> {
    const outputDir = path.dirname(docPath);
    const outputFileName = `converted-${Date.now()}.pdf`;
    const outputPath = path.join(outputDir, outputFileName);

    const command = `libreoffice --headless --convert-to pdf --outdir ${outputDir} ${docPath}`;
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          return reject(new BadRequestException('Erro ao converter DOC para PDF.'));
        }
        resolve(outputPath);
      });
    });
  }
}
