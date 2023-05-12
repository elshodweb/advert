import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { Knex } from 'knex';
import { isUUID } from 'class-validator';

@Injectable()
export class AdvertsService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

  //post
  async create(createAdvertDto: CreateAdvertDto, file: Express.Multer.File) {
    const { sell, buy, url } = createAdvertDto;
    console.log(file);

    if (!file) {
      throw new BadRequestException('picture not be empty');
    }

    const newDate = {
      advert_buy: sell,
      advert_sell: buy,
      advert_url: url,
      advert_picture: file.filename,
    };
    const [newAdvert] = await this.knex('adverts')
      .insert(newDate)
      .returning('*');
    return { message: 'created', newAdvert };
  }

  // get all
  async findAll() {
    const adverts = await this.knex('adverts')
      .select('*')
      .orderBy('advert_created_at', 'asc');
    return adverts;
  }

  //get one
  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const advert = await this.knex('adverts')
      .select('*')
      .where({ advert_id: id })
      .first();

    if (!advert) {
      throw new NotFoundException('not found advert for this id');
    }
    await this.knex('history').insert({
      history_buy: advert.advert_buy,
      history_sell: advert.advert_sell,
      advert_id: advert.advert_id,
    });
    return advert;
  }

  // update
  async update(id: string, updateAdvertDto: UpdateAdvertDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid ID');
    }
    const advert = await this.knex('adverts')
      .select('*')
      .where({ advert_id: id })
      .first();

    if (!advert) {
      throw new NotFoundException('not found advert for this id');
    }
    const { sell, buy, url } = updateAdvertDto;

    const newDate = {
      advert_buy: sell,
      advert_sell: buy,
      advert_url: url,
    };
    const data = await this.knex('adverts')
      .update(newDate)
      .where({ advert_id: id })
      .returning('*');
    return { message: 'updated advert ', advert: data };
  }

  //delete
  async remove(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid this ID');
    }
    const advert = await this.knex('adverts')
      .select('*')
      .where({ advert_id: id })
      .first();

    if (!advert) {
      throw new NotFoundException('not found advert for this id');
    }
    const data = await this.knex('adverts')
      .del()
      .where({ advert_id: id })
      .returning('*');

    return { message: 'deleted advert', advert: data };
  }

  async statsAll() {
    const data = await this.knex('history');
    return data;
  }
}
