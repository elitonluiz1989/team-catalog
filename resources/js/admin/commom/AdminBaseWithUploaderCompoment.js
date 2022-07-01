import { AppUploader } from './../../core/AppUploader/index';
import { isNullOrUndefined, isNullOrWhiteSpace } from '../../core/helpers';

import { AdminBaseComponent } from './AdminBaseComponent';

export class AdminBaseWithUploaderCompoment extends AdminBaseComponent {
    /**
     * 
     * @type {HTMLImageElement}
     */
    imageCover;

    /**
     * 
     * @type {string}
     */
    imageDefaultCover;

    /**
     * 
     * @type {HTMLInputElement}
     */
    imageField;

    /**
     * 
     * @type {string}
     */
    removeRoute;

    /**
     * 
     * @type {AppUploader}
     */
    #uploader;

    /**
     * 
     * @type {string[]}
     */
    #uploads;

    constructor() {
        super();

        this.#uploads = [];
    }

    /**
     * 
     * @param {AppUploaderDto} dto 
     */
    addUploader(dto) {
        this.#uploader = new AppUploader(dto);
    }

    /**
     * 
     * @param {Selector} selector 
     */
    addUploaderFormResetHandler(selector) {
        selector.on('click', async evt => {
            evt.preventDefault();

            await this.removeImage();

            this.form.reset();
            this.resetImage();
        });
    }

    async onUploadCompleted(data) {
        if (isNullOrUndefined(data) || data.length === 0 || isNullOrUndefined(data[0].url)) {
            return;
        }

        this.#uploads.push(data[0].path);

        await this.loadImage(data[0].url);
    }

    /**
     * 
     * @param {string} source 
     * @param {object} size 
     * @returns 
     */
    async loadImage(source, size = null) {
        return new Promise((resolve, reject) => {
            const src = this.#setImageSrcQueryString(source, size);

            this.imageCover.onload = () => resolve(this.imageCover);
            this.imageCover.onerror = reject;
            this.imageCover.src = src;
        });
    }

    /**
     * 
     * @param {string} imageSrc 
     */
    async loadImageForm(imageSrc) {
        this.imageDefaultCover = imageSrc;

        try {
            const imgSize = {
                height: this.imageCover.getAttribute('height'),
                width: this.imageCover.getAttribute('width')
            };
            
            await this.loadImage(imageSrc, imgSize);
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * 
     * @param {?string} removingMessage
     * @returns 
     */
    async removeImage(removingMessage = null) {
        if (!Array.isArray(this.#uploads) || this.#uploads.length === 0) {
            return;
        }

        removingMessage = removingMessage ?? 'Removing record image...';
        this.mask.setLoadingMessage(removingMessage);
        await this.mask.show();

        const response = await AppRequestStatic.delete(this.removeRoute, { files: this.#uploads });

        if (response.hasErrors) {
            console.error(response.getErrorsString());
        }

        let key;

        for (const image of response.data) {
            if (!image.deleted) {
                continue;
            }

            key = this.#uploads.findIndex(ui => ui === image.file);

            if (key < 0) {
                continue;
            }

            this.#uploads.splice(key, 1);
        }

        await this.mask.hide();
        this.mask.clearLoadingMessage();
    }

    /**
     * 
     * @param {object} data
     * @returns {object}
     */
     uploadStoreHandler(data) {
        if (
            AppUploader.isInstanceOf(this.#uploader) &&
            this.#uploader.hasResults &&
            !isNullOrWhiteSpace(this.#uploader.results[0].path)
        ) {
            data['image_removed'] = this.imageField.value;
            data['image'] = this.#uploader.results[0].path;
        }
        
        return data;
    }

    /**
     *
     * @param {AppForm} form
     * @param {any} data
     */
    async fillForm(form, data) {
        form.record.fill(data);
        form.fill();
        form.createRecordIdentifier('id');

        this.imageField.value = data.image

        if (!isNullOrWhiteSpace(data['image_src'])) {
            await this.loadImageForm(data['image_src']);
        }
    }

    /**
     * 
     * @param {string} source 
     * @param {?object} size 
     * @returns {string}
     */
    #setImageSrcQueryString(source, size = null) {
        if (isNullOrUndefined(size)) {
            return source;
        }

        const queryParams = [];

        if (size.height) {
            queryParams.push(`height=${size.height}`);
        }

        if (size.width) {
            queryParams.push(`width=${size.width}`);
        }

        let queryString = source.indexOf('?') !== -1 ? `${source}&` : `${source}?`;
        queryString += queryParams.join('&');

        return queryString;
    }

    resetImage() {
        this.imageCover.src = this.imageDefaultCover;
    }
}