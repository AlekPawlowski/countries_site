const createDataParagraph = (boldContent: string, value: string | number): string => `<p><span class="bold">${boldContent}: </span><span>${value}</span></p>`;


export { createDataParagraph }