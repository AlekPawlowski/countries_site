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

interface Test{
    official: string;
}
export interface SingleViewCountry extends CountryInformation{
    name: {
        common: string;
        nativeName: Test[];
    };
    subregion: string;
    tld: string[];
    currencies: Currencie[];
    languages: Languages[];
    borders: string[];
}

