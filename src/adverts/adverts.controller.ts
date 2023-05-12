import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { extname } from 'path';
@Controller('adverts')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService) {}
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          return cb(null, `${v4()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @Post()
  create(
    @Body() createAdvertDto: CreateAdvertDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.advertsService.create(createAdvertDto, file);
  }

  @Get()
  findAll() {
    return this.advertsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertsService.findOne(id);
  }

  @UseInterceptors(FileInterceptor('picture', {}))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateAdvertDto: UpdateAdvertDto) {
    return this.advertsService.update(id, updateAdvertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertsService.remove(id);
  }
}
