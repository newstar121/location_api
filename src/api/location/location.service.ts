import { Injectable } from '@nestjs/common';
import { Country } from 'src/database/country.entry'
import { State } from 'src/database/state.entry'
import { City } from 'src/database/city.entry'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryParam, StateParam, CityParam, CountryResult, SearchResult, StateResult, CityResult } from 'src/utils/types';
import { count } from 'console';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(Country)
        private countryRepository: Repository<Country>,

        @InjectRepository(State)
        private stateRepository: Repository<State>,

        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) { }

    async getAllData(param: CountryParam): Promise<SearchResult[]> {

        try {
            console.log('param', param)

            const country = await this.countryRepository
                .createQueryBuilder('country')
                .where('country.name LIKE :name', { name: '%' + param.name + '%' })
                .getMany();

            const state = await this.stateRepository
                .createQueryBuilder('state')
                .where('state.name LIKE :name', { name: '%' + param.name + '%' })
                .getMany();

            const city = await this.cityRepository
                .createQueryBuilder('city')
                .where('city.name LIKE :name', { name: '%' + param.name + '%' })
                .getMany();

            let result: SearchResult[] = []
            for (let i = 0; i < country.length; i++) {
                result.push({
                    id: country[i].id,
                    name: country[i].name,
                    admin_level: country[i].admin_level,
                    parentId: 0
                })
            }

            for (let i = 0; i < state.length; i++) {
                result.push({
                    id: state[i].id,
                    name: state[i].name,
                    admin_level: state[i].admin_level,
                    parentId: state[i].country
                })
            }

            for (let i = 0; i < city.length; i++) {
                result.push({
                    id: city[i].id,
                    name: city[i].name,
                    admin_level: city[i].admin_level,
                    parentId: city[i].state
                })
            }
            return result || []
        } catch (error) {
            console.log('getAllData error', error)
        }
    }

    async getCountryData(param: CountryParam): Promise<CountryResult[]> {

        try {
            console.log('param', param)

            let result: CountryResult[] = [];
            let country;

            if (param.id && param.id != 0) {
                country = await this.countryRepository
                    .findOneById(param.id)
                country = [country];
            } else if (param.name) {
                country = await this.countryRepository
                    .createQueryBuilder('country')
                    .where('country.name LIKE :name', { name: '%' + param.name + '%' })
                    .getMany();
            } else {
                country = await this.countryRepository.find();
            }

            for (let i = 0; i < country.length; i++) {

                const state = []

                const stateData = await this.stateRepository.find({
                    where: { country: country[i].id },
                });

                for (let j = 0; j < stateData.length; j++) state.push(stateData[j].name)

                result.push({
                    id: country[i].id,
                    name: country[i].name,
                    admin_level: country[i].admin_level,
                    state: state
                })
            }

            return result || []
        } catch (error) {
            console.log('getCountryData error', error)
        }
    }

    async getStateData(param: StateParam): Promise<StateResult[]> {

        try {
            console.log('param', param)

            let result: StateResult[] = [];
            let state;

            if (param.id && param.id != 0) {
                state = await this.stateRepository
                    .findOneById(param.id)
                state = [state];
            } else if (param.name || param.countryId) {

                if (param.name && param.countryId) {
                    state = await this.stateRepository
                        .createQueryBuilder('state')
                        .where('state.name LIKE :name', { name: '%' + param.name + '%' })
                        .andWhere('state.country = :country', { country: param.countryId })
                        .getMany();
                } else if (param.name) {
                    state = await this.stateRepository
                        .createQueryBuilder('state')
                        .where('state.name LIKE :name', { name: '%' + param.name + '%' })
                        .getMany();
                } else {
                    state = await this.stateRepository.find({
                        where: { country: param.countryId },
                    });
                }

            } else {
                // state = await this.stateRepository.find();
                state = []
            }

            for (let i = 0; i < state.length; i++) {

                const city = []

                const cityData = await this.cityRepository.find({
                    where: { state: state[i].id },
                });

                for (let j = 0; j < cityData.length; j++) city.push(cityData[j].name)

                const country = await this.countryRepository.findOneById(state[i].country)

                result.push({
                    id: state[i].id,
                    name: state[i].name,
                    country: country.name,
                    countryId: state[i].id,
                    admin_level: state[i].admin_level,
                    city: city
                })
            }

            return result || []
        } catch (error) {
            console.log('getStateData error', error)
        }

    }

    async getCityData(param: CityParam): Promise<CityResult[]> {

        try {
            console.log('param', param)

            let result: CityResult[] = [];
            let city;

            if (param.id && param.id != 0) {
                city = await this.cityRepository
                    .findOneById(param.id)
                city = [city];
            } else if (param.name || param.stateId) {

                if (param.name && param.stateId) {
                    city = await this.cityRepository
                        .createQueryBuilder('city')
                        .where('city.name LIKE :name', { name: '%' + param.name + '%' })
                        .andWhere('city.state = :state', { state: param.stateId })
                        .getMany();
                } else if (param.name) {
                    city = await this.cityRepository
                        .createQueryBuilder('city')
                        .where('city.name LIKE :name', { name: '%' + param.name + '%' })
                        .getMany();
                } else {
                    city = await this.cityRepository.find({
                        where: { state: param.stateId },
                    });
                }

            } else {
                // city = await this.cityRepository.find();
                city = []
            }

            for (let i = 0; i < city.length; i++) {

                const state = await this.stateRepository.findOneById(city[i].state)
                const country = await this.countryRepository.findOneById(state.country)
                result.push({
                    id: city[i].id,
                    name: city[i].name,
                    state: state.name,
                    stateId: city[i].id,
                    country: country.name,
                    countryId: country.id,
                    admin_level: city[i].admin_level
                })
            }

            return result || []
        } catch (error) {
            console.log('getCityData error', error)
        }
    }
}
