
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
import { AdminBaseWithUploaderCompoment } from './../commom/AdminBaseWithUploaderCompoment';

export class ProductsComponent extends AdminBaseWithUploaderCompoment {
    route = '/products';

    async run() {
        const modalDto = new AppModalDto();
        modalDto.modalSelector = '#product-form-modal';
        modalDto.openerButtonSelector = '#product-form-modal-opener-btn';
        modalDto.dismissButtonSelector = '#product-form-modal-dismiss-btn';
        const dto = this.getFormDto('#product-form', '#product-form-messages');
        dto.modal = modalDto;
        dto.beforeSubmitHandler = form => {
            let data = {};

            if (!isNullOrUndefined(form.form['id'])) {
                data['id'] = form.form['id'].value;
            }

            data['name'] = form.form['name'].value;
            data['link'] = form.form['link'].value;
            data['category_id'] = form.form['category_id'].value;

            data = this.uploadStoreHandler(data); 

            form.requestData = data;
        };

        this.configureform(dto, new Product());
        this.configureMask();

        this.imageCover = document.getElementById('product-image');
        this.imageField = document.querySelector('input[name="image"]');
        this.imageDefaultCover = this.imageCover.src;

        const editEventDto = new AdminEditEventDto();
        editEventDto.selector = '.product__edit-action';
        editEventDto.findRouteKey = 'findRoute';
        editEventDto.actionRouteKey = 'actionRoute';
        editEventDto.callback = (form, data) => this.fillForm(form, data);
        editEventDto.onFormClose = (form) => {
            this.resetImage();

            if (!form.saved) {
                this.removeImage();
            }
        };
        this.addEditEvent(editEventDto);

        const removeEventDto = new AdminRemoveEventDto();
        removeEventDto.selector = '.product__remove-action';
        removeEventDto.actionRouteKey = 'actionRoute';
        removeEventDto.confirmMessager = 'Are you sure to remove this product?';
        this.addRemoveEvent(removeEventDto);

        const container = selector('#uploader-image');
        this.removeRoute = container.data('routeRemove');

        const uploaderRoute = new AppUploaderRouteDto();
        uploaderRoute.url = container.data('routeUpload');
        uploaderRoute.method = HttpVerbsEnum.POST;
        const uploaderDto = new AppUploaderDto();
        uploaderDto.id = 'product-image-uploader';
        uploaderDto.parent = container;
        uploaderDto.route = uploaderRoute;
        uploaderDto.onComplete = async data => this.onUploadCompleted(data);
        uploaderDto.onRemove = async () => await this.removeImage('Removing previous product image');
        uploaderDto.customParams = { type: container.data('type') };
        uploaderDto.zIndex = 3000;
        uploaderDto.progressBarColor = '#725C18';

        this.addUploader(uploaderDto);

        const formResetButton = selector(this.form.form.querySelector('button[type="reset"]'));
        this.addUploaderFormResetHandler(formResetButton);

        selector('#product-link').on('click', evt => {
            if (!isNullOrUndefined(evt.target.value)) {
                evt.target.select();
            }
        });
    }
}
