import { Module } from '@nestjs/common';
import { AdvertsService } from './adverts.service';
import { AdvertsController } from './adverts.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  controllers: [AdvertsController],
  providers: [AdvertsService],
  imports: [SharedModule],
})
export class AdvertsModule {}
