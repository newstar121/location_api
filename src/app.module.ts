import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { LocationModule } from './api/location/location.module';

@Module({
  imports: [
    ApiModule,
    LocationModule,
    RouterModule.register([
      {
        path: 'api',
        module: ApiModule,
        children: [
          {
            path: 'location',
            module: LocationModule,
          }
        ],
      },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
