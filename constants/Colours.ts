import { text } from "./i18n";

export const Colours = {
    Tesco: {
        background: '#00539f',
        text: '#ffffff',
    },
    Waterstones: {
        background: '#b8ff9f',
        text: '#000',
    },
    Cafenero: {
        background: '#000',
        text: '#ffffff',
    },
    Starbucks: {
        background: '#00704a',
        text: '#ffffff',
    },
    Nectar: {
        background: '#8520f7',
        text: '#ffffff',
    },
    Ikea: {
        background: '#ffcc00',
        text: '#003399',
    },
    Coop: {
        background: '#00A1CC',
        text: '#000',
    },
    Lidl: {
        background: "#0050AA",
        text: "#FFF000",
    },
    Cherrylane: {
        background: '#E1134F',
        text: '#fff',
    },
    Hobbycraft: {
        background: '#F7CD4A',
        text: '#000',
    },
    Default: {
        background: (() => {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                return `#${randomColor}`;
        })(),
        text: '#fff',
    },
}