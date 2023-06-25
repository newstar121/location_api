import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {

    getAllData(param: Object): Object[] {

        console.log('param', param)
        return []

    }

    getCountryData(param: Object): Object[] {
        
        console.log('param', param)
        return []
    }

    getStateData(param: Object): Object[] {
        
        console.log('param', param)
        return []
    }

    getCityData(param: Object): Object[] {
        
        console.log('param', param)
        return []
    }
}
