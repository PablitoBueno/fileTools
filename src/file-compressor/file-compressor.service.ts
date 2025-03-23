import { Injectable, BadRequestException } from '@nestjs/common';
import * as sharp from 'sharp';
import * as { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileCompressorService {
  async compressFile(filePath: string, mimeType: string): Promise<string> {
    const outputPath = `uploads/compressed-${Date.now()}${path.extname(filePath)}`;

    if (mimeType.includes('image')) {
      return this.compressImage(filePath, outputPath);
    } else if (mimeType.includes('pdf')) {
      return this.compressPdf(filePath, outputPath);
    } else {
      throw new BadRequestException('Formato de arquivo não suportado.');
    }
  }

  private async compressImage(inputPath: string, outputPath: string): Promise<string> {
    await sharp(inputPath)
      .resize({ width: 1024 }) // Redimensiona mantendo proporção
      .jpeg({ quality: 70 }) // Ajusta qualidade
      .toFile(outputPath);
    return outputPath;
  }

  private async compressPdf(inputPath: string, outputPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const command = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -o ${outputPath} ${inputPath}`;
      exec(command, (error) => (error ? reject(error) : resolve(outputPath)));
    });
  }
}
