import {Selector} from "../Selector";
import {isFunction, objectArrayToString, randId} from "../helpers";
import {AppRequest} from "../AppRequest/AppRequest";
import HttpVerbsEnum from "../AppRequest/Enums/HttpVerbsEnum";
import {AppProgressBar} from "../AppProgressBar";
import {AppProgressBarDto} from "../AppProgressBar/Dtos/AppProgressBarDto";
import {AppMask} from "../AppMask/AppMask";
import {AppMaskDto} from "../AppMask/Dtos/AppMaskDto";
import { AppElement } from './../AppElement/index';
import { delay } from './../helpers';

export class AppUploader {
    /**
     *
     * @type {AppUploaderDto}
     */
    #settings;

    /**
     *
     * @type {Selector}
     */
    #uploader;

    /**
     *
     * @type {AppMask}
     */
    #mask;

    /**
     *
     * @type {AppProgressBar}
     */
    #progressBar;

    /**
     *
     * @type {AppRequest}
     */
    #request;

    /**
     *
     * @param {AppUploaderDto} dto
     */
    constructor(dto) {
        dto.validateAndThrow();
        this.#settings = dto;
        this.#request = new AppRequest();

        this.#createUploader();
        this.#createMask();
        this.#createProgressBar();
        this.#setUploadEvent();
    }

    /**
     *
     * @param {AppUploaderDto} dto
     * @returns {AppUploader}
     */
    static create(dto) {
        return new AppUploader(dto);
    }

    #createUploader() {
        const inputFile = AppElement.create('input');
        inputFile.element.id = this.#settings.id ?? `app-uploader-${randId()}`;
        inputFile.element.setAttribute('type', 'file');
        inputFile.setStyles({
            height: '100%',
            width: '100%',
            position: 'absolute',
            zIndex: this.#settings.zIndex,
            top: 0,
            left: 0,
            opacity: 0,
            cursor: 'pointer'
        });

        this.#settings.parent.get(0).appendChild(inputFile.element);
        this.#settings.parent.get(0).setAttribute('style', 'position: relative');

        this.#uploader = new Selector(inputFile.element);
    }

    #createMask() {
        const dto = new AppMaskDto()
        dto.id = this.#settings.id ? `${this.#settings.id}-mask` : null;
        dto.parent = this.#settings.parent.get(0);
        dto.withLoading = false;
        dto.backgroundColor = 'white';
        dto.zIndex = this.#settings.zIndex + 1;

        this.#mask = new AppMask(dto);
    }

    #createProgressBar() {
        const dto = new AppProgressBarDto();
        dto.parent = this.#settings.parent.get(0);
        dto.barColor = this.#settings.progressBarColor;
        dto.textColor = this.#settings.progressBarTextColor;
        dto.zIndex = this.#settings.zIndex + 2;

        this.#progressBar = new AppProgressBar(dto);
    }

    #setUploadEvent() {
        this.#uploader?.on('change', async evt => {
            if (evt.target.files?.length > 0) {
                const data = new FormData();
                data.append('files', evt.target.files[0]);

                if (this.#settings.customParams instanceof Object) {
                    for (const key in this.#settings.customParams) {
                        data.append(key.toString(), this.#settings.customParams[key]);
                    }
                }

                await this.#progressBar.show();
                await this.#mask.show();

                const response = await this.#request
                    .url(this.#settings.route)
                    .method(HttpVerbsEnum.POST)
                    .setData(data)
                    .onUploadProgress(evt => {
                        const progress = `${Math.round((evt.loaded * 100) / evt.total)}%`;
                        this.#progressBar.progress(progress);

                        console.log(`The ${this.#settings.fieldName} is ${progress} uploaded... `);
                    })
                    .execute();

                if (response.hasErrors) {
                    const message = objectArrayToString(response.errors, 'content');
                    throw new Error(message);
                }

                await this.#callOnComplete(response.data);
                await this.#progressBar.hide();
                await this.#mask.hide();
            }
        });
    }

    /**
     * 
     * @param {any} data 
     */
    async #callOnComplete(data) {
        if (isFunction(this.#settings.onComplete)) {
            await this.#settings.onComplete(data);
            await delay(500);
        }
    }
}
