import { Module } from '@nestjs/common';
import { ConversionPdfDocModule } from './conversion-pdf-doc/conversion-pdf-doc.module';
import { MergerPdfModule } from './merge-pdf/merger-pdf.module';
import { PdfImageConverterModule } from './pdf-image-converter/pdf-image-converter.module';
import { FileCompressorModule } from './file-compressor/file-compressor.module';

@Module({
  imports: [
    ConversionPdfDocModule,
    MergerPdfModule,
    PdfImageConverterModule,
    FileCompressorModule,
  ],
})
export class AppModule {}
