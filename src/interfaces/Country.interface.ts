export interface CountryInformation{
    name: {
        common: string;
    };
    population: number;
    capital: string;
    flags: {
        svg: string;
        png: string;
    }
    region: string;
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
        native: string;
    };
    alpha2Code: string; 
    alpha3Code: string; // for get full name of border countries
    subgregion: string;
    topLevelDomain: string[];
    currencies: Currencie[];
    languages: Languages[];
}

