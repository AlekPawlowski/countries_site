export interface CountryInformation{
    name: {
        common: string;
    };
    population: number;
    capital: string[];
    flags: {
        svg: string;
        png: string;
    }
    region: string;
    cca3: string;
}

export interface Currencie {
    code: string;
    name: string;
    symbol: string;
}

export interface Languages {
    cioc: string;
    name: string;
}

export interface SingleViewCountry extends CountryInformation{
    name: {
        common: string;
        nativeName: any;
    };
    subregion: string;
    tld: string[];
    currencies: Currencie[];
    languages: Languages[];
    borders: string[];
}

