import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { UpdateAdvertDto } from './dto/update-advert.dto';
import { Knex } from 'knex';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AdvertsService {
  constructor(@Inject('KnexConnection') private knex: Knex) {}

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

  async findAll() {
    const adverts = await this.knex('adverts')
      .select('*')
      .orderBy('advert_created_at', 'asc');
    return adverts;
  }

  async findOne(id: string) {
    const advert = await this.knex('adverts')
      .select('*')
      .where({ advert_id: id })
      .first();

    if (!advert) {
      throw new NotFoundException('not found advert for this id');
    }
    return advert;
  }

  async update(id: string, updateAdvertDto: UpdateAdvertDto) {
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
    return { message: 'updated todo ', todo: data };
  }

  async remove(id: string) {
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

    return { message: 'deleted todo', todo: data };
  }
}
