import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CityParam, CityResult, CountryParam, CountryResult, SearchResult, StateParam, StateResult } from 'src/utils/types';

@Controller('/')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    // Get Search Result

    @Get('/')
    getAll(@Query('id') id: number, @Query('s') search: string): Promise<SearchResult[]> {

        const param: CountryParam = {
            id: id ? id : 0,
            name: search ? search : '',
        }

        return this.locationService.getAllData(param);
    }

    // Get Country

    @Get('/country')
    getCountry(@Query('country') countryId: number, @Query('s') search: string): Promise<CountryResult[]> {

        const param: CountryParam = {
            id: countryId ? countryId : 0,
            name: search ? search : '',
        }
        return this.locationService.getCountryData(param);
    }

    // Get Country

    @Get('/state')
    getState(@Query('state') stateId: number, @Query('s') search: string, @Query('country') countryId: number,): Promise<StateResult[]> {

        const param: StateParam = {
            id: stateId ? stateId : 0,
            name: search ? search : '',
            countryId: countryId ? countryId : 0
        }

        return this.locationService.getStateData(param);
    }

    // Get Country

    @Get('/city')
    getCity(@Query('city') cityId: number, @Query('s') search: string, @Query('state') stateId: number): Promise<CityResult[]> {

        const param: CityParam = {
            id: cityId ? cityId : 0,
            name: search ? search : '',
            stateId: stateId ? stateId : 0
        }

        return this.locationService.getCityData(param);
    }

}
