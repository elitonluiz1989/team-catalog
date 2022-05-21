import {AppElement} from "../AppElement";
import {delay} from "../helpers";

export class AppProgressBar {
    /**
     *
     * @type {AppProgressBarDto}
     */
    #settings;

    /**
     *
     * @type {AppElement}
     */
    #container;

    /**
     *
     * @type {AppElement}
     */
    #wrapper;

    /**
     *
     * @type {AppElement}
     */
    #bar;

    /**
     *
     * @type {AppElement}
     */
    #text;

    /**
     *
     * @param {AppProgressBarDto} dto
     */
    constructor(dto) {
        dto.validateAndThrow();

        this.#settings = dto;

        this.#createContainer();
        this.#createWrapper();
        this.#createBar();
        this.#createText();
    }

    async show() {
        this.#container.setStyle('display', 'flex');

        await delay(500);

        this.#container.setStyle('opacity', 1);
    }

    async hide() {
        this.#container.setStyle('opacity', 0);

        await delay(500);

        this.#container.setStyle('display', 'none');
    }

    /**
     *
     * @param {int|string} progress
     * @returns {Promise<void>}
     */
    async progress(progress) {
        this.#bar.setStyle('width', progress);
        this.#text.element.textContent = progress;
    }

    /**
     *
     * @param {int|string} value
     */
    set width(value) {
        this.#bar.setStyle('width', value);
    }

    /**
     *
     * @param {string} value
     */
    set text(value) {
        this.#text.element.textContent = value;
    }

    #createContainer() {
        const element = document.createElement('div');
        this.#settings.parent.appendChild(element);

        this.#container = new AppElement(element);
        this.#container.setStyles({
            display: 'none',
            'align-items': 'center',
            'justify-content': 'center',
            height: '100%',
            width: '100%',
            opacity: 0,
            transition: 'opacity .5s ease',
            position: 'absolute',
            top: 0,
            left: 0 ,
            'z-index': this.#settings.zIndex
        });

    }

    #createWrapper() {
        this.#wrapper = new AppElement();
        this.#wrapper.createElement('div');
        this.#wrapper.setStyles({
            border: '1px solid ' + this.#settings.barColor,
            'min-height': '15px',
            width: '50%',
            'max-width': '300px',
            padding: '3px',
            'border-radius': '6px'
        });

        this.#container.appendChild(this.#wrapper);
    }

    #createBar() {
        this.#bar = new AppElement();
        this.#bar.createElement('div');
        this.#bar.setStyles({
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            height: 'fit-content',
            width: 0,
            'overflow-x': 'hidden',
            'background-color': this.#settings.barColor,
            'border-radius': '3px'
        });

        this.#wrapper.appendChild(this.#bar);
    }

    #createText() {
        this.#text = new AppElement();
        this.#text.createElement('span');
        this.#text.setStyles({
            'font-size': '0.7em',
            'color': this.#settings.textColor
        })

        this.#bar.appendChild(this.#text);
    }
}
