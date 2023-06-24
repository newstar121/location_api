import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { Country } from 'src/database/country.entry';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from 'src/database/state.entry';
import { City } from 'src/database/city.entry';

@Module({
  imports: [
    TypeOrmModule.forFeature([Country, State, City]),
  ],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule { }
