import { AppForm } from './../../core/AppForm/AppForm';
import { AppFormDto } from './../../core/AppForm/Dtos/AppFormDto';
import { AppFormMessageDto } from './../../core/AppFormMessage/Dtos/AppFormMessageDto';
import { AppModalDto } from "../../core/AppModal/Dtos/AppModalDto";
import { AppRequestStatic } from "../../core/AppRequest/AppRequestStatic";
import HttpVerbsEnum from "../../core/AppRequest/Enums/HttpVerbsEnum";
import { isNullOrUndefined, isNullOrWhiteSpace, selector } from "../../core/helpers";
import { AppUploader } from "../../core/AppUploader";
import { AppUploaderDto, AppUploaderRouteDto } from "../../core/AppUploader/Dtos/AppUploaderDto";

import {AdminBaseComponent} from "../commom/AdminBaseComponent";
import {AdminEditEventDto} from "../commom/Dtos/AdminEditEventDto";
import {AdminRemoveEventDto} from "../commom/Dtos/AdminRemoveEventDto";

import {Category} from "./Category";

export class CategoriesComponent extends AdminBaseComponent {
    route = '/categories';

    /**
     * 
     * @type {AppUploader}
     */
    #uploader;

    /**
     * 
     * @type {string[]}
     */
    #imagesUploaded = [];

    /**
     * 
     * @type {HTMLImageElement}
     */
    #imageCover;

    /**
     * 
     * @type {string}
     */
    #imageDefaultCover;

    /**
     * 
     * @type {HTMLInputElement}
     */
    #imageField;

    /**
     * 
     * @type {string}
     */
    #removeRoute;


    run() {
        const appModalDto = new AppModalDto(
            '#category-form-modal',
            '#category-form-modal-opener-btn',
            '#category-form-modal-dismiss-btn'
        );
        this.configureMask();
        this.#configureCategoryForm(appModalDto);

        this.#imageCover = document.getElementById('category-image');
        this.#imageField = document.querySelector('input[name="image"]');
        this.#imageDefaultCover = this.#imageCover.src;
        const container = selector('#uploader-image');
        this.#removeRoute = container.data('routeRemove');
        const imgSize = {
            height: this.#imageCover.getAttribute('height'),
            width: this.#imageCover.getAttribute('width')
        };

        selector(appModalDto.openerButtonSelector)
            .on('click', async () => {
                if (!isNullOrWhiteSpace(this.form.form['order']?.value)){
                    return;
                }

                await this.mask.show();

                const response = await AppRequestStatic.get(`${this.route}/order/last`);

                if (!response.hasErrors && !isNaN(response.data)) {
                    this.form.form['order'].value = (+response.data) + 1;
                }

                await this.mask.hide();
            });

        /**
         *
         * @param {AppForm} appForm
         * @param {any} data
         */
        const fillForm = async (appForm, data) => {
            const category = new Category();
            category.fill(data);

            appForm.fill(category);
            appForm.createRecordIdentifier('id', category.id);

            this.#imageField.value = data.image

            if (!isNullOrWhiteSpace(data['image_src'])) {
                this.#imageDefaultCover = data['image_src'];

                try {
                    await this.#loadImage(data['image_src'], imgSize);
                } catch (err) {
                    console.error(err);
                }
            }
        };
        const adminEditEventDto = new AdminEditEventDto(
            '.category__edit-action',
            'findRoute',
            'actionRoute',
            fillForm
        );
        this.addEditEvent(adminEditEventDto);

        const adminRemoveEventDto = new AdminRemoveEventDto(
            '.category__remove-action',
            'actionRoute',
            'Are you sure to remove this category?'
        );
        this.addRemoveEvent(adminRemoveEventDto);

        const uploaderRoute = new AppUploaderRouteDto();
        uploaderRoute.url = container.data('routeUpload');
        uploaderRoute.method = HttpVerbsEnum.POST;
        const uploaderDto = new AppUploaderDto();
        uploaderDto.id = 'category-image-uploader';
        uploaderDto.parent = container;
        uploaderDto.route = uploaderRoute;
        uploaderDto.onComplete = async (data) => {
            if (isNullOrUndefined(data) || data.length === 0 || isNullOrUndefined(data[0].url)) {
                return;
            }

            this.#imagesUploaded.push(data[0].path);

            await this.#loadImage(data[0].url);
        };
        uploaderDto.onRemove = async () => await this.#removeImage('Removing previous category image');
        uploaderDto.customParams = { type: container.data('type') };
        uploaderDto.zIndex = 3000;
        uploaderDto.progressBarColor = '#725C18';
        this.#uploader = new AppUploader(uploaderDto);

        selector(this.form.form.querySelector('button[type="reset"]')).on('click', async evt => {
            evt.preventDefault();
            
            await this.#removeImage();

            this.form.reset();
            this.#resetImage();
        });
    }

    /**
     * 
     * @param {string} source 
     * @param {object} size 
     * @returns 
     */
    async #loadImage(source, size = null) {
        return new Promise((resolve, reject) => {
            const src = this.#setImageSrcQueryString(source, size);

            this.#imageCover.onload = () => resolve(this.#imageCover);
            this.#imageCover.onerror = reject;
            this.#imageCover.src = src;
        });
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

    /**
     * 
     * @param {?string} removingMessage
     * @returns 
     */ 
    async #removeImage(removingMessage = null) {
        if (!Array.isArray(this.#imagesUploaded) || this.#imagesUploaded.length === 0) {
            return;
        }

        removingMessage = removingMessage ?? 'Removing category image...';
        this.mask.setLoadingMessage(removingMessage);
        await this.mask.show();

        const response = await AppRequestStatic.delete(this.#removeRoute, {files: this.#imagesUploaded});

        if (response.hasErrors) {
            console.error(response.getErrorsString());
        }

        let key;

       for (const image of response.data) {
            if (!image.deleted) {
                continue;
            }

            key = this.#imagesUploaded.findIndex(ui => ui === image.file);

            if (key < 0) {
                continue;
            }

            this.#imagesUploaded.splice(key, 1);
        }

        await this.mask.hide();
        this.mask.clearLoadingMessage();
    }

    #resetImage() {
        this.#imageCover.src = this.#imageDefaultCover;
    }

    /**
     * 
     * @param {AppModalDto} modalDto 
     */
    #configureCategoryForm(modalDto) {
        const dto = new AppFormDto();
        dto.form = document.querySelector('#category-form');
        dto.message = new AppFormMessageDto();
        dto.message.container = '#category-form-messages';
        dto.modal = modalDto;

        this.form = new AppForm(dto);
        this.form.setMask(this.mask);
        this.form.record = new Category();
        this.form.beforeSubmitHandler = (form) => {
            const data = {};

            if (
                AppUploader.isInstanceOf(this.#uploader) &&
                this.#uploader.hasResults &&
                !isNullOrWhiteSpace(this.#uploader.results[0].path)
            ) {
                data['image_removed'] = this.#imageField.value;
                data['image'] = this.#uploader.results[0].path; 
            }

            if (!isNullOrUndefined(form.form['id'])) {
                data['id'] = form.form['id'].value;
            }

            data['name'] = form.form['name'].value;
            data['order'] = form.form['order'].value;

            form.requestData = data;
        };
        this.form.addInvalidFieldEventHandler();
        this.form.addSubmitEventHandler();
    }
}
