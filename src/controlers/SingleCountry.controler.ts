import { SingleViewCountry } from "../interfaces/Country.interface";
import { createDataParagraph } from "./variables.global";

export default class SingleCountryView {
    countryInformations: SingleViewCountry | null = null;
    constructor(
        public contryCode: string,
        public container: HTMLElement,
        public countriesData: SingleViewCountry[]
    ) { }

    initlize(): void {
        this.countryInformations = this.countriesData.filter(country => {
            return country.cca3 == this.contryCode;
        })[0];
        this.container.appendChild(this.renderBox(this.countryInformations));
    }

    renderBox(data: SingleViewCountry): HTMLElement {
        const countryElement = document.createElement("section");
        countryElement.id = "country_element";
        countryElement.innerHTML = this.fillCountryElement(data);
        return countryElement;
    }
    private fillCountryElement(data: SingleViewCountry): string {
        const {
            flags: { png: img },
            name: {
                common: name,
                nativeName
            },
            population,
            region,
            subregion,
            tld,
            currencies,
            capital,
            languages,
            cca3,
            borders: bordersCodes
        } = data;

        const native = Object.values(nativeName)[0].official as string;
        const currenciesTxt = Object.values(currencies).map(curr => curr.name).join(", ")
        const langTxt = Object.values(languages).map(lang => lang).join(", ")
        const borderElements = bordersCodes.map(border => this.createBorderElement(border)).join(" ");
        console.log(data);
        return `<section id="map_box">
                <img src="${img}" alt="${cca3}" />
            </section>
            <section class="info_box">
                <h2>${name}</h2>
                <section class="column">
                    ${createDataParagraph("NativeName", native)}
                    ${createDataParagraph("Population", population)}
                    ${createDataParagraph("Region", region)}
                    ${createDataParagraph("Sub region", subregion)}
                    ${createDataParagraph("Capital", capital ? capital.map(single => single).join(", ") : "Unknown")}
                </section>
                <section class="column">
                    ${createDataParagraph("Top Level Domain", tld[0])}
                    ${createDataParagraph("Currencies", currenciesTxt)}
                    ${createDataParagraph("Languages", langTxt)}
                </section>
                <section id="border_countries">
                    <p class="bold">
                        Border countries: 
                    </p>
                    ${borderElements}

                </section>
            </section>
        `
    }
    private createBorderElement(borderCode: string): string {
        return `<a class="border_element" href="#?country=${borderCode}" onclick="setTimeout(()=>location.reload()), 100" target="_self">${this.getCountryFromCode(borderCode)}</a>`
    }
    private getCountryFromCode(code: string): string {
        const countryDataFromCode = this.countriesData.filter(country => country.cca3 == code)[0]
        const name = countryDataFromCode.name.common;
        return name;
    }
}