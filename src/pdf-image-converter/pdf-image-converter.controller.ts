import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfImageConverterService } from './pdf-image-converter.service';

@Controller('convert')
export class PdfImageConverterController {
  constructor(private readonly converterService: PdfImageConverterService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async convert(@UploadedFile() file: Express.Multer.File, @Body('type') type: 'pdf-to-image' | 'image-to-pdf') {
    return { result: await this.converterService.convert(file.path, type) };
  }
}
