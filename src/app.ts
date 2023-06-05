import './styles/style.scss';
import fetchData from './components/fetchData.components';
import { SingleViewCountry } from './interfaces/Country.interface';
import { ListOfCountries } from './controlers/ListOfCountries.controler';
import SingleCountryView from './controlers/SingleCountry.controler';

// countries list handler
const listContainerToFill = document.getElementById('container_to_fill') as HTMLElement;
const singleElementContainer = document.getElementById('single_country') as HTMLElement;
const selectBoxContainer = document.getElementById('region_select') as HTMLElement;
const searchInput = document.getElementById('search_input') as HTMLInputElement;

// check if country list exist in local storage, if not, import new one
const localStorageCountryData = localStorage.getItem('country_list');
if (!localStorageCountryData) {
    fetchData().then((data: SingleViewCountry[]) => {
        localStorage.setItem('country_list', JSON.stringify(data));
        handleData(data);
    });
} else {
    handleData(JSON.parse(localStorageCountryData));
}

function handleData(data: SingleViewCountry[]): void {
    if (window.location.hash.length > 0) {
        handleSingleCountry(data);
    } else {
        // view for list
        handleList(data);
    }
}
function handleSingleCountry(data: SingleViewCountry[]): void {
    // view for single country
    document.body.classList.add('single');
    document.body.classList.remove('list');
    const countryName = window.location.hash.split('=')[1];
    const coutnryElement = new SingleCountryView(countryName, singleElementContainer, data);
    coutnryElement.initlize();
}

function handleList(data: SingleViewCountry[]): void {
    document.body.classList.add('list');
    document.body.classList.remove('single');
    const list = new ListOfCountries(data, listContainerToFill, selectBoxContainer);
    list.initlize();
    selectBoxContainer.onchange = (event) => {
        const targetElement = event.target as HTMLSelectElement;
        const value = targetElement.value;
        list.updateOption(value);
    };
    searchInput.oninput = (event) => {
        const targetElement = event.target as HTMLInputElement;
        const value = targetElement.value;
        list.updateFhrase(value);
    };
}

// thee change
/**
 * @value true -> dark mode
 * @value false -> light mode
 */
let siteTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
console.log(siteTheme);

const body = document.body;
const changeThemeButton = document.getElementById('color_select') as HTMLButtonElement;
changeThemeButton.onclick = () => updateTheme();
updateTheme();

function updateTheme(): void {
    body.classList.add(siteTheme ? 'dark_mode' : 'light_mode');
    body.classList.remove(siteTheme ? 'light_mode' : 'dark_mode');

    // update button classes and text
    changeThemeButton.classList.add(siteTheme ? 'dm_color' : 'lm_color');
    changeThemeButton.classList.remove(siteTheme ? 'lm_color' : 'dm_color');

    const buttonThemeTitle = changeThemeButton.querySelector('#mode') as HTMLElement;
    buttonThemeTitle.innerHTML = siteTheme ? "Dark mode" : "Light mode";

    siteTheme = !siteTheme;
}