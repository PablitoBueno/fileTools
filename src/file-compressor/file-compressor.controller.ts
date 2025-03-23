import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileCompressorService } from './file-compressor.service';

@Controller('compress')
export class FileCompressorController {
  constructor(private readonly compressorService: FileCompressorService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async compress(@UploadedFile() file: Express.Multer.File) {
    return { compressedFilePath: await this.compressorService.compressFile(file.path, file.mimetype) };
  }
}
