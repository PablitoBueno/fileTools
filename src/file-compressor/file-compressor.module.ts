import { Module } from '@nestjs/common';
import { FileCompressorService } from './file-compressor.service';
import { FileCompressorController } from './file-compressor.controller';

@Module({
  providers: [FileCompressorService],
  controllers: [FileCompressorController],
})
export class FileCompressorModule {}
