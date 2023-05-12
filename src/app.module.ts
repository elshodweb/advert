import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdvertsModule } from './adverts/adverts.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [AdvertsModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
