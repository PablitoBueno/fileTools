import { Module } from '@nestjs/common';
import { ConversionPdfDocService } from './conversion-pdf-doc.service';
import { ConversionPdfDocController } from './conversion-pdf-doc.controller';

@Module({
  controllers: [ConversionPdfDocController],
  providers: [ConversionPdfDocService],
  exports: [ConversionPdfDocService],
})
export class ConversionPdfDocModule {}
