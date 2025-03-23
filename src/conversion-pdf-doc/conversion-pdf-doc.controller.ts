import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ConversionPdfDocService } from './conversion-pdf-doc.service';

@Controller('convert-pdf-doc')
export class ConversionPdfDocController {
  constructor(private readonly conversionService: ConversionPdfDocService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async convert(
    @UploadedFile() file: Express.Multer.File,
    @Body('conversionType') conversionType: 'pdf-to-doc' | 'doc-to-pdf',
  ) {
    if (conversionType === 'pdf-to-doc') {
      const result = await this.conversionService.convertPdfToDoc(file.path);
      return { filePath: result };
    } else if (conversionType === 'doc-to-pdf') {
      const result = await this.conversionService.convertDocToPdf(file.path);
      return { filePath: result };
    } else {
      throw new Error('Tipo de conversão inválido.');
    }
  }
}
