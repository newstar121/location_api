import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModule } from './api/location/location.module';
import { Connection } from 'typeorm';
import { Country } from './database/country.entry';
import { State } from './database/state.entry';
import { City } from './database/city.entry';

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
    ]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'location_api',
      entities: [Country, State, City],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { 
  constructor(private connection: Connection) {}
}
