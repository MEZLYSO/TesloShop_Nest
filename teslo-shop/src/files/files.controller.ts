import { BadRequestException, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileNamer, fileFilter } from './helpers';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: fileFilter,
      // limits: {
      //   fieldSize: 1000
      // }
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer
      })
    }))
  uploadProductImage(
    @UploadedFile()
    file: Express.Multer.File
  ) {

    if (!file) {
      throw new BadRequestException('Make sure the file is an image')
    }

    return {
      fileName: file.filename
    }
  }
}
