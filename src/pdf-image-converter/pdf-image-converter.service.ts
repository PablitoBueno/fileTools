import { Injectable, BadRequestException } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import * as poppler from 'pdf-poppler';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfImageConverterService {
  async convert(inputPath: string, type: 'pdf-to-image' | 'image-to-pdf'): Promise<string | string[]> {
    if (type === 'pdf-to-image') {
      return this.pdfToImages(inputPath);
    } else if (type === 'image-to-pdf') {
      return this.imagesToPdf([inputPath]); // Ajuste para múltiplas imagens
    }
    throw new BadRequestException('Tipo de conversão inválido.');
  }

  private async pdfToImages(pdfPath: string): Promise<string[]> {
    const outputPath = path.join('uploads', `pdf-images-${Date.now()}`);
    const options = { format: 'png', out_dir: outputPath, out_prefix: 'page', scale: 2 };

    await poppler.convert(pdfPath, options);
    return fs.readdirSync(outputPath).map((file) => path.join(outputPath, file));
  }

  private async imagesToPdf(images: string[]): Promise<string> {
    const pdfPath = `uploads/images-${Date.now()}.pdf`;
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    for (const img of images) {
      doc.addPage().image(img, 0, 0, { fit: [600, 800] });
    }

    doc.end();
    return new Promise((resolve) => stream.on('finish', () => resolve(pdfPath)));
  }
}
