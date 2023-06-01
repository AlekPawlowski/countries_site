import { CountryInformation } from "../interfaces/Country.interface";

export class ListOfCountries {
    allCountries: CountryInformation[] = [];
    countriesToShow: CountryInformation[] = []; // for sorting purposes
    regions: string[] = [];
    constructor(
        public incomeCountries: CountryInformation[],
        public listContainer: HTMLElement
    ) { }

    initlize() {
        this.allCountries = this.incomeCountries;
        this.renderAllCountries();
    }



    renderAllCountries() {
        console.log(this.listContainer);
        const createParagraph = (boldContent: string, value: string | number): string => `<p><span class="bold">${boldContent}</span><span>${value}</span></p>`;
        this.listContainer.innerHTML = this.allCountries.map((country: CountryInformation) => {
            const { name: {
                    common: countryName
                }, 
                population, capital, flags, region
            } = country;
            // const {common: countryName} = name;
            return `
                <a href="#?country=${countryName}">
                    <img src="${flags.svg}" alt="flag_${countryName}">
                    <section>
                        <h2>${countryName}</h2>
                        ${createParagraph("Population", population)}
                        ${createParagraph("Region", region)}
                        ${createParagraph("Capital", capital)}
                    </section>
                </a>
            `;
        }).join('');

    }
}