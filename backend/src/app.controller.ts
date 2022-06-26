import { Body, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { generateCode } from '../utils/generateCode'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return 'hello world';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          cb(null, generateCode(6) + '.jpg')
        },
      })
  }))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      name: file.filename.split('.')[0],
      url: file.filename
    }
  }

  @Get(':filename')
  getImage(@Param('filename') fileName: string, @Res() res: any) {
    res.sendFile(fileName, { root: './upload' })
  }
}
