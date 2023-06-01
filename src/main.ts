import './styles/style.scss';
import fetchData from './components/fetchData.components';
import { SingleViewCountry } from './interfaces/Country.interface';
import { ListOfCountries } from './controlers/ListOfCountries.controler';

const regionContainer = document.getElementById('countries_container') as HTMLElement;

fetchData().then((data: SingleViewCountry[])=>{
    console.log(data);
    new ListOfCountries(data, regionContainer).initlize();
});

