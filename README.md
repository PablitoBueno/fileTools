# File Processing API

This project is an API built with NestJS and TypeScript, offering a variety of services for file processing, including:

- **PDF Merger**: Combine multiple PDF files into a single document.
- **File Compressor**: Compress files to reduce their size.
- **PDF ↔ DOC Conversion**: Convert PDF documents to DOC (Word) and vice versa.
- **PDF to Image Converter**: Extract images or convert PDF pages to image formats.

**Note**: Each functionality is organized into separate modules to ensure modularity and ease of maintenance.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Detailed Usage Instructions](#detailed-usage-instructions)
  - [PDF Merger](#pdf-merger)
  - [File Compressor](#file-compressor)
  - [PDF ↔ DOC Conversion](#pdf-doc-conversion)
  - [PDF Image Converter](#pdf-image-converter)
- [Module Structure](#module-structure)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Overview

This API is designed to provide a comprehensive solution for file manipulation and conversion, with a special focus on PDFs. Leveraging the robustness of NestJS, the application is divided into independent modules, making it easy to scale and maintain each functionality separately.

The implemented modules include:

- **PDF Merger**: Handles the merging of multiple PDF files.
- **File Compressor**: Compresses files, optimizing storage and transfer.
- **PDF ↔ DOC Conversion**: Converts PDFs into Word documents and vice versa.
- **PDF Image Converter**: Converts PDF pages into images, making it easier to view or extract graphics.

## Prerequisites

Before starting, ensure you have installed on your machine:

- Node.js (version 12 or higher)
- npm or Yarn

## Installation

Clone the repository:

```sh
git clone https://github.com/PablitoBueno/typescriptNestAPI.git
cd typescriptNestAPI
```

Install dependencies:

Using npm:

```sh
npm install
```

or using Yarn:

```sh
yarn install
```

## Running the Application

To start the development server:

```sh
npm run start:dev
```

The application will be available at `http://localhost:3000`.

To build and run in a production environment:

```sh
npm run build
npm run start:prod
```

## Detailed Usage Instructions

Each module exposes endpoints for specific file processing tasks. Below are example instructions and sample commands for using these endpoints. Adjust parameters and file paths as needed.

### PDF Merger

- **Endpoint**: `POST /merger-pdf/merge`
- **Usage**: This endpoint accepts multiple PDF files and returns a single merged PDF document.

Example using curl:

```sh
curl -X POST http://localhost:3000/merger-pdf/merge   -F "files=@/path/to/first.pdf"   -F "files=@/path/to/second.pdf"
```

Expected Response:

- A merged PDF file is returned as the response.
- In a browser, the file might prompt for download or display directly if supported.

### File Compressor

- **Endpoint**: `POST /file-compressor/compress`
- **Usage**: This endpoint compresses the provided file and returns the compressed version.

Example using curl:

```sh
curl -X POST http://localhost:3000/file-compressor/compress   -F "file=@/path/to/yourfile.zip"
```

Expected Response:

- A compressed file is returned as a download.
- The endpoint may also provide details on the compression ratio or file size reduction.

### PDF ↔ DOC Conversion

#### Convert PDF to DOC

- **Endpoint**: `POST /conversion-pdf-doc/to-doc`
- **Usage**: Upload a PDF file to convert it to a DOC (Word) file.

Example using curl:

```sh
curl -X POST http://localhost:3000/conversion-pdf-doc/to-doc   -F "file=@/path/to/document.pdf"
```

Expected Response:

- A DOC file converted from the PDF is returned.

#### Convert DOC to PDF

- **Endpoint**: `POST /conversion-pdf-doc/to-pdf`
- **Usage**: Upload a DOC (Word) file to convert it to a PDF file.

Example using curl:

```sh
curl -X POST http://localhost:3000/conversion-pdf-doc/to-pdf   -F "file=@/path/to/document.doc"
```

Expected Response:

- A PDF file converted from the DOC file is returned.

### PDF Image Converter

- **Endpoint**: `POST /pdf-image-converter/convert`
- **Usage**: This endpoint converts pages of a PDF into individual images. Depending on the implementation, it may return multiple images (one per page) or a zip archive containing the images.

Example using curl:

```sh
curl -X POST http://localhost:3000/pdf-image-converter/convert   -F "file=@/path/to/document.pdf"
```

Expected Response:

- One or more images generated from the PDF pages are returned.
- Check the response headers and documentation for details on how the images are packaged (e.g., as separate files or a compressed archive).

## Module Structure

### PDF Merger

- **Purpose**: Merge multiple PDF files into a single document.
- **Key Files**:
  - `merger-pdf.controller.ts`
  - `merger-pdf.service.ts`
  - `merger-pdf.module.ts`

### File Compressor

- **Purpose**: Compress files to reduce their size.
- **Key Files**:
  - `file-compressor.controller.ts`
  - `file-compressor.service.ts`
  - `file-compressor.module.ts`

### PDF ↔ DOC Conversion

- **Purpose**: Convert documents between PDF and DOC formats.
- **Key Files**:
  - `conversion-pdf-doc.controller.ts`
  - `conversion-pdf-doc.service.ts`
  - `conversion-pdf-doc.module.ts`

### PDF Image Converter

- **Purpose**: Convert PDF pages into images.
- **Key Files**:
  - `pdf-image-converter.controller.ts`
  - `pdf-image-converter.service.ts`
  - `pdf-image-converter.module.ts`

## API Endpoints

General endpoint structure for each module:

- **PDF Merger**
  - `POST /merger-pdf/merge` – Receives multiple PDFs and returns a merged PDF.
- **File Compressor**
  - `POST /file-compressor/compress` – Receives a file and returns the compressed file.
- **PDF ↔ DOC Conversion**
  - `POST /conversion-pdf-doc/to-doc` – Converts a PDF to DOC.
  - `POST /conversion-pdf-doc/to-pdf` – Converts a DOC to PDF.
- **PDF Image Converter**
  - `POST /pdf-image-converter/convert` – Converts PDF pages into images.

## Project Structure

```
/src
  ├── app.module.ts
  ├── main.ts
  ├── merger-pdf/
  ├── file-compressor/
  ├── conversion-pdf-doc/
  └── pdf-image-converter/
```

This structure ensures that each functionality is managed independently, facilitating testing, maintenance, and scalability.
