import './styles/style.scss';
import fetchData from './components/fetchData.components';
import { SingleViewCountry } from './interfaces/Country.interface';
import { ListOfCountries } from './controlers/ListOfCountries.controler';


// countries list handler
const regionContainer = document.getElementById('countries_container') as HTMLElement;
const selectBoxContainer = document.getElementById('region_select') as HTMLElement;
const searchInput = document.getElementById('search_input') as HTMLInputElement;

fetchData().then((data: SingleViewCountry[])=>{
    const list = new ListOfCountries(data, regionContainer, selectBoxContainer);
    list.initlize();
    selectBoxContainer.onchange = (event) => {
        const value = event.target.value;
        list.updateOption(value);
    };
    searchInput.oninput = (event) => {
        const value = event.target.value;
        list.updateFhrase(value);
    };
});

