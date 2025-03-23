import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { MergerPdfService } from './merger-pdf.service';
import { Response } from 'express';
import * as fs from 'fs';

@Controller('merger-pdf')
export class MergerPdfController {
  constructor(private readonly mergerPdfService: MergerPdfService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './uploads', // Certifique-se de que o diretório exista
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async mergePdfs(@UploadedFiles() files: Express.Multer.File[], @Res() res: Response) {
    if (!files || files.length < 2) {
      throw new HttpException('Please upload at least two PDF files.', HttpStatus.BAD_REQUEST);
    }
    try {
      const outputPath = await this.mergerPdfService.mergePdfs(files);
      res.download(outputPath, () => {
        // Remove os arquivos temporários enviados
        files.forEach(file => {
          try {
            fs.unlinkSync(file.path);
          } catch (error) {
            console.error(`Error deleting file ${file.path}:`, error.message);
          }
        });
        try {
          fs.unlinkSync(outputPath);
        } catch (error) {
          console.error(`Error deleting file ${outputPath}:`, error.message);
        }
      });
    } catch (error) {
      console.error('Error merging PDFs:', error.message);
      throw new HttpException('Error merging PDF files.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
