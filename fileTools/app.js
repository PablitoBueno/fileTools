const express = require('express');
const app = express();
const path = require('path');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importa os módulos
const combinePdfsModule = require('./src/combine-pdfs/combine-pdfs.module');
const pdfImageModule = require('./src/pdf-image-converter/pdf-image.module');
const pdfToDocxModule = require('./src/pdf-to-docx/pdf-to-docx.module');
const pdfToTextModule = require('./src/pdf-to-text/pdf-to-text.module'); // Novo módulo

// Define as rotas
app.use('/api/combine-pdfs', combinePdfsModule);
app.use('/api/pdf-image-converter', pdfImageModule);
app.use('/api/pdf-to-docx', pdfToDocxModule);
app.use('/api/pdf-to-text', pdfToTextModule); // Nova rota

// Rota de saúde
app.get('/health', (req, res) => {
  res.json({ 
    status: 'online',
    memoryUsage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
    services: [
      'combine-pdfs',
      'pdf-image-converter',
      'pdf-to-docx',
      'pdf-to-text' // Novo serviço
    ]
  });
});

// Rota de fallback
app.use((req, res) => {
  res.status(404).json({ 
    error: `Rota não encontrada: ${req.method} ${req.url}`,
    endpoints: [
      'POST /api/combine-pdfs/combine',
      'POST /api/pdf-image-converter/pdf-to-images',
      'POST /api/pdf-to-docx/pdf-to-docx',
      'POST /api/pdf-to-docx/docx-to-pdf',
      'POST /api/pdf-to-text/extract-text', // Nova endpoint
      'GET /health'
    ]
  });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Endpoints disponíveis:`);
  console.log(`- POST /api/combine-pdfs/combine`);
  console.log(`- POST /api/pdf-image-converter/pdf-to-images`);
  console.log(`- POST /api/pdf-to-docx/pdf-to-docx`);
  console.log(`- POST /api/pdf-to-docx/docx-to-pdf`);
  console.log(`- POST /api/pdf-to-text/extract-text`); // Nova linha
  console.log(`- GET /health`);
  console.log(`=================================`);
});