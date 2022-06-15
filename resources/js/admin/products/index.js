
import { AppForm } from './../../core/AppForm/AppForm';
import { AppFormDto } from './../../core/AppForm/Dtos/AppFormDto';
import { AppFormMessageDto } from './../../core/AppFormMessage/Dtos/AppFormMessageDto';
import { AppModalDto } from "../../core/AppModal/Dtos/AppModalDto";
import { AppRequestStatic } from './../../core/AppRequest/AppRequestStatic';
import HttpVerbsEnum from "../../core/AppRequest/Enums/HttpVerbsEnum";
import { AppUploader } from "../../core/AppUploader";
import { AppUploaderDto, AppUploaderRouteDto } from "../../core/AppUploader/Dtos/AppUploaderDto";
import { isNullOrUndefined, isNullOrWhiteSpace, selector } from "../../core/helpers";

import { AdminBaseComponent } from "../commom/AdminBaseComponent";
import { AdminEditEventDto } from "../commom/Dtos/AdminEditEventDto";
import { AdminRemoveEventDto } from "../commom/Dtos/AdminRemoveEventDto";

import { Product } from "./Product";
import { AppElement } from './../../core/AppElement/index';

export class ProductsComponent extends AdminBaseComponent {
    route = '/products';

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
     * @type {HTMLInputElement}
     */
    #imageRemoved;

    /**
     * 
     * @type {string}
     */
    #removeRoute;

    async run() {
        this.configureMask();
        this.#configureProductform();

        this.#imageCover = document.getElementById('product-image');
        this.#imageField = document.querySelector('input[name="image"]');
        this.#imageDefaultCover = this.#imageCover.src;
        const container = selector('#uploader-image');
        this.#removeRoute = container.data('routeRemove');
        const imgSize = {
            height: this.#imageCover.getAttribute('height'),
            width: this.#imageCover.getAttribute('width')
        };
        const uploaderRoute = new AppUploaderRouteDto();
        uploaderRoute.url = container.data('routeUpload');
        uploaderRoute.method = HttpVerbsEnum.POST;
        const uploaderDto = new AppUploaderDto();
        uploaderDto.id = 'product-image-uploader';
        uploaderDto.parent = container;
        uploaderDto.route = uploaderRoute;
        uploaderDto.onComplete = async (data) => {
            if (isNullOrUndefined(data) || data.length === 0 || isNullOrUndefined(data[0].url)) {
                return;
            }

            this.#imagesUploaded.push(data[0].path);

            await this.#loadImage(data[0].url);
        };
        uploaderDto.onRemove = async () => await this.#removeImage('Removing previous product image');
        uploaderDto.customParams = { type: container.data('type') };
        uploaderDto.zIndex = 3000;
        uploaderDto.progressBarColor = '#725C18';
        this.#uploader = new AppUploader(uploaderDto);

        const editEventDto = new AdminEditEventDto();
        editEventDto.selector = '.product__edit-action';
        editEventDto.findRouteKey = 'findRoute';
        editEventDto.actionRouteKey = 'actionRoute';
        editEventDto.callback = async (appForm, data) => {
            appForm.record.fill(data);
            appForm.fill();
            appForm.createRecordIdentifier('id');

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
        editEventDto.onFormClose = (form) => {
            this.#resetImage();

            if (!form.saved) {
                this.#removeImage();
            }
        };
        this.addEditEvent(editEventDto);

        const removeEventDto = new AdminRemoveEventDto();
        removeEventDto.selector = '.product__remove-action';
        removeEventDto.actionRouteKey = 'actionRoute';
        removeEventDto.confirmMessager = 'Are you sure to remove this product?';
        this.addRemoveEvent(removeEventDto);

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

        removingMessage = removingMessage ?? 'Removing product image...';
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

    #configureProductform() {
        const modalDto = new AppModalDto();
        modalDto.modalSelector = '#product-form-modal';
        modalDto.openerButtonSelector = '#product-form-modal-opener-btn';
        modalDto.dismissButtonSelector = '#product-form-modal-dismiss-btn';

        const dto = new AppFormDto();
        dto.form = document.querySelector('#product-form');
        dto.message = new AppFormMessageDto();
        dto.message.container = '#product-form-messages';
        dto.modal = modalDto;

        this.form = new AppForm(dto);
        this.form.setMask(this.mask);
        this.form.record = new Product();
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

            data['id'] = form.form['id'].value;
            data['name'] = form.form['name'].value;
            data['link'] = form.form['link'].value;
            data['category_id'] = form.form['category_id'].value;

            form.requestData = data;
        };
        this.form.addInvalidFieldEventHandler();
        this.form.addSubmitEventHandler();
    }
}
