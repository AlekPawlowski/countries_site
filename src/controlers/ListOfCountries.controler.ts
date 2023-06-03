import { CountryInformation } from "../interfaces/Country.interface";
import { createDataParagraph } from "./variables.global";
import customSelectBoxes  from '../components/customSelectBox';

export class ListOfCountries {
    allCountries: CountryInformation[] = [];
    countriesToShow: CountryInformation[] = []; // for sorting purposes
    regions: string[] = [];
    searchedCountry: string = "";
    selectedRegion: string = "";
    constructor(
        public incomeCountries: CountryInformation[],
        public listContainer: HTMLElement,
        public selectBoxContainer: HTMLElement
    ) { }

    get regionsArr(){
        return this.regions;
    }
    initlize() {
        this.allCountries = this.incomeCountries;
        this.countriesToShow = this.incomeCountries;

        this.renderCountries(this.countriesToShow, this.listContainer);
        this.fillSelectBox();
    }
    
    public renderCountries(data: CountryInformation[], container: HTMLElement): void {
        console.log(data);
        container.innerHTML = data.map((country: CountryInformation) => this.renderSingleCountry(country)).join('');
    }

    private renderSingleCountry(data: CountryInformation): string {
        // sideEffect, fill regions array
        const { name: {
            common: countryName 
        },
            population, capital, flags, region
        } = data;
        if(!this.regions.includes(region)) this.regions.push(region);
        return `
            <section class="country_element">
            <a href="#?country=${countryName}" target="_blank">
                <img src="${flags.png}" alt="flag_${countryName}">
            </a>
                <section class="country_info">
                    <h2>${countryName}</h2>
                    ${createDataParagraph("Population", population)}
                    ${createDataParagraph("Region", region)}
                    ${createDataParagraph("Capital", capital)}
                </section>
            </section>
        `;
    }

    public fillSelectBox() {
        const selectOptions = this.regions;
        const selectBoxContainer = this.selectBoxContainer;
        selectBoxContainer.innerHTML = "";
        // create options
        selectOptions.forEach(option => {
            const optionElement = createOptionElement(option);
            selectBoxContainer.appendChild(optionElement);
        })

        function createOptionElement(option: string): HTMLElement {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            optionElement.innerHTML = option;
            return optionElement;
        }
    };

    public updateOption(value: string): void {
        this.selectedRegion = value;
        this.filterSearchElements();
    }

    public updateFhrase(value: string): void {
        this.searchedCountry = value;
        this.filterSearchElements();
    }

    public filterSearchElements(): void {
        this.countriesToShow = this.allCountries.filter((country) => {
            return (
                (this.selectedRegion.length == 0 ? true : country.region == this.selectedRegion)
                &&
                (country.name.common.toLocaleLowerCase().includes(this.searchedCountry.toLocaleLowerCase()))
            )
        });
        this.renderCountries(this.countriesToShow, this.listContainer);
    }
}