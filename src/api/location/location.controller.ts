import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('/')
export class LocationController {
    constructor(private readonly locationService: LocationService) { }

    // Get Search Result

    @Get('/')
    getAll(@Query('id') id: number, @Query('s') search: string): Object[] {

        console.log('id', id)
        console.log('search', search)

        let param = {
            id: id ? id : 0,
            search: search ? search : '',
        }

        return this.locationService.getAllData({ param });
    }

    // Get Country

    @Get('/country')
    getCountry(@Query('country') countryId: number, @Query('s') search: string): Object[] {

        console.log('countryId', countryId)
        console.log('search', search)

        let param = {
            countryId: countryId ? countryId : 0,
            search: search ? search : '',
        }

        return this.locationService.getCountryData({ param });
    }

    // Get Country

    @Get('/state')
    getState(@Query('country') countryId: number, @Query('s') search: string): Object[] {

        let param = {
            countryId: countryId ? countryId : 0,
            search: search ? search : '',
        }

        return this.locationService.getStateData({ param });
    }

    // Get Country

    @Get('/city')
    getCity(@Query('state') stateId: number, @Query('s') search: string): Object[] {

        let param = {
            stateId: stateId ? stateId : 0,
            search: search ? search : '',
        }

        return this.locationService.getCityData({ param });
    }

}
