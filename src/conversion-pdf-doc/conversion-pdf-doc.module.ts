import { Module } from '@nestjs/common';
import { ConversionPdfDocService } from './conversion-pdf-doc.service';
import { ConversionPdfDocController } from './conversion-pdf-doc.controller';

@Module({
  controllers: [ConversionPdfDocController],
  providers: [ConversionPdfDocService],
  exports: [ConversionPdfDocService], // Caso precise ser usado em outros módulos
})
export class ConversionPdfDocModule {}
