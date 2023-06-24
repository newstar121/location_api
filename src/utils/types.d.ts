export interface CountryParam {
    id: number,
    name: string
}

export interface CountryResult {
    id: number,
    name: string,
    admin_level: number,
    state: any[]
}

export interface StateParam {
    id: number,
    name: string,
    countryId: number,
}

export interface StateResult {
    id: number,
    name: string,
    admin_level: number,
    country: string,
    countryId: number
    city: any[]
}

export interface CityParam {
    id: number,
    name: string,
    stateId: number,
}

export interface CityResult {
    id: number,
    name: string,
    admin_level: number,
    state: string,
    stateId: number,
    country: string,
    countryId: number
}

export interface SearchResult {
    id: number
    name: string,
    admin_level: number,
    parentId: number
}