import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MergerPdfService {
  async mergePdfs(files: Express.Multer.File[]): Promise<string> {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach(page => mergedPdf.addPage(page));
    }
    // Garante que o diretório de uploads exista
    const outputDir = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, `merged-${Date.now()}.pdf`);
    fs.writeFileSync(outputPath, await mergedPdf.save());
    return outputPath;
  }
}
