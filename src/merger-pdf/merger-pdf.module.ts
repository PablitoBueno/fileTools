import { Module } from '@nestjs/common';
import { MergerPdfController } from './merger-pdf.controller';
import { MergerPdfService } from './merger-pdf.service';

@Module({
  controllers: [MergerPdfController],
  providers: [MergerPdfService],
})
export class MergerPdfModule {}
