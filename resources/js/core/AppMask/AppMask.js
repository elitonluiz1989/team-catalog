import {delay, isNullOrUndefined, randId} from "../helpers";
import {AppElement} from "../AppElement";
import { AppMaskDto } from './Dtos/AppMaskDto';

export class AppMask {
    /**
     *
     * @type {AppMaskDto}
     */
    #settings;

    /**
     *
     * @type {AppElement}
     */
    #mask;

    /**
     *
     * @type {AppElement}
     */
     #loading;

    /**
     *
     * @type {AppElement}
     */
     #loadingText;

    /**
     * 
     * @type {boolean}
     */
    #isVisible = false;

    /**
     *
     * @param {AppMaskDto} settings
     */
    constructor(settings) {
        this.#validateSettings(settings);

        this.#createMask();

        if (this.#settings.withLoading) {
            this.#createLoadingContainer();
        }
    }

    /**
     * 
     * @param {object} object 
     * @returns {boolean}
     */
    static isInstanceOf(object) {
        return object instanceof AppMask;
    }

    async show() {
        this.#mask.setStyle('display', 'flex');
        this.#mask.setStyle('opacity', 0.8);

        this.showLoading();

        this.#isVisible = true;
    }

    async hide() {
        await this.hideLoading();

        this.#mask.setStyle('opacity', 0);

        await delay(500);

        this.#mask.setStyle('display', 'none');

        this.#isVisible = false;
    }

    showLoading() {
        if (!(this.#loading instanceof AppElement)) {
            return;
        }

        this.#loading.setStyle('display', 'flex');
        this.#loading.setStyle('opacity', 1);
    }

    async hideLoading() {
        if (!(this.#loading instanceof AppElement)) {
            return;
        }

        this.#loading.setStyle('opacity', 0);

        await delay(500)

        this.#loading.setStyle('display', 'none');
    }

    get isVisible() {
        return this.#isVisible;
    }

    setLoadingMessage(message, styles = null) {
        if (isNullOrUndefined(this.#loading)) {
            return;
        }

        if (isNullOrUndefined(styles)) {
            styles = {
                fontSize: '0.8rem',
                color: this.#settings.spinnerColor
            }
        }

        if (isNullOrUndefined(this.#loadingText)) {
            this.#loadingText = AppElement.create('div');
            this.#loading.appendChild(this.#loadingText);
        }

        this.#loadingText.setStyles(styles);
        this.#loadingText.element.textContent = message;
    }

    clearLoadingMessage() {
        this.setLoadingMessage('');
    }

    /**
     *
     * @param {AppMaskDto} settings
     */
    #validateSettings(settings) {
        if (!AppMaskDto.isInstanceOf(settings)) {
           settings = new AppMaskDto();
        }

        this.#settings = settings.copy();
        this.#settings.id = settings.id ?? this.#createRandomId('app-mask');
        this.#settings.parent = settings.parent ?? document.querySelector('body');
        this.#settings.withLoading = settings.withLoading;
    }

    /**
     *
     * @param {string} prefix
     * @returns {string}
     */
    #createRandomId(prefix) {
        const randomNumber = randId();

        return `${prefix}-${randomNumber}`;
    }

    #createMask() {
        this.#mask = new AppElement();
        this.#mask.createElement('div');
        this.#mask.element.id = this.#settings.id;
        this.#mask.setStyles({
            display: 'none',
            height: '100%',
            width: '100%',
            position: this.#settings.position,
            top: 0,
            left: 0,
            zIndex: this.#settings.zIndex,
            opacity: 0,
            backgroundColor: this.#settings.backgroundColor,
        });

        this.#settings.parent.appendChild(this.#mask.element);
    }

    #createLoadingContainer() {
        const srOnly = new AppElement();
        srOnly.createElement('div');
        srOnly.setStyles({
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0
        });
        srOnly.element.textContent = 'Loading...';

        const spinner = new AppElement();
        spinner.createElement('div');
        spinner.setStyles({
            display: 'inline-block',
            width: '2rem',
            height: '2rem',
            verticalAlign: '-0.125em',
            borderWidth: '0.25em',
            borderStyle: 'solid',
            borderColor: this.#settings.spinnerColor,
            borderRightColor: 'transparent',
            borderRadius: '50%',
            '-webkit-animation': '0.75s linear infinite spinner-border',
            animation: '0.75s linear infinite spinner-border'
        });
        spinner.element.setAttribute('role', 'status');
        spinner.appendChild(srOnly);
        
        this.#loading = new AppElement();
        this.#loading.createElement('div');
        this.#loading.element.id = this.#createRandomId(`${this.#settings.id}-loading`);
        this.#loading.setStyles({
            display: 'none',
            flexFlow: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: this.#settings.zIndex + 1,
            backgroundColor: 'transparent'
        });
        this.#loading.appendChild(spinner);

        this.#settings.parent.appendChild(this.#loading.element);
    }
}
