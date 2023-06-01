import { SingleViewCountry } from '../interfaces/Country.interface';

export default async function fetchData(): Promise<SingleViewCountry[]> {
    const data:SingleViewCountry[] = await fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => data);
    return data;
}