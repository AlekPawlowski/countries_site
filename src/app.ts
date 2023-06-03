import './styles/style.scss';
import fetchData from './components/fetchData.components';
import { SingleViewCountry } from './interfaces/Country.interface';
import { ListOfCountries } from './controlers/ListOfCountries.controler';


// countries list handler
const regionContainer = document.getElementById('countries_container') as HTMLElement;
const selectBoxContainer = document.getElementById('region_select') as HTMLElement;
const searchInput = document.getElementById('search_input') as HTMLInputElement;

fetchData().then((data: SingleViewCountry[]) => {
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

// mode change

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