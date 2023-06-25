import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { LocationModule } from './location/location.module';

@Module({
  providers: [ApiService],
  controllers: [ApiController]
})
export class ApiModule { }
