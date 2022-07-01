import { AppModalDto } from "../../core/AppModal/Dtos/AppModalDto";
import { AppRequestStatic } from "../../core/AppRequest/AppRequestStatic";
import HttpVerbsEnum from "../../core/AppRequest/Enums/HttpVerbsEnum";
import { isNullOrUndefined, isNullOrWhiteSpace, selector } from "../../core/helpers";
import { AppUploaderDto, AppUploaderRouteDto } from "../../core/AppUploader/Dtos/AppUploaderDto";

import { AdminBaseWithUploaderCompoment } from './../commom/AdminBaseWithUploaderCompoment';
import { AdminEditEventDto } from "../commom/Dtos/AdminEditEventDto";
import { AdminRemoveEventDto } from "../commom/Dtos/AdminRemoveEventDto";

import {Category} from "./Category";

export class CategoriesComponent extends AdminBaseWithUploaderCompoment {
    route = '/categories';

    run() {
        const modalDto = new AppModalDto();
        modalDto.modalSelector = '#category-form-modal';
        modalDto.openerButtonSelector = '#category-form-modal-opener-btn';
        modalDto.dismissButtonSelector = '#category-form-modal-dismiss-btn';
        const dto = this.getFormDto('#category-form', '#category-form-messages');
        dto.modal = modalDto;
        dto.beforeSubmitHandler = form => {
            let data = {};

            if (!isNullOrUndefined(form.form['id'])) {
                data['id'] = form.form['id'].value;
            }
    
            data['name'] = form.form['name'].value;
            data['order'] = form.form['order'].value;

            data = this.uploadStoreHandler(data);

            form.requestData = data;
        };

        this.configureform(dto, new Category());
        this.configureMask();

        this.imageCover = document.getElementById('category-image');
        this.imageField = document.querySelector('input[name="image"]');
        this.imageDefaultCover = this.imageCover.src;

        const editEventDto = new AdminEditEventDto();
        editEventDto.selector = '.category__edit-action',
        editEventDto.findRouteKey = 'findRoute';
        editEventDto.actionRouteKey = 'actionRoute';
        editEventDto.callback = (form, data) => this.fillForm(form, data);

        this.addEditEvent(editEventDto);

        const removeEventDto = new AdminRemoveEventDto();
        removeEventDto.selector = '.category__remove-action';
        removeEventDto.actionRouteKey = 'actionRoute'
        removeEventDto.confirmMessage = 'Are you sure to remove this category?';

        this.addRemoveEvent(removeEventDto);

        const container = selector('#uploader-image');
        this.removeRoute = container.data('routeRemove');

        const uploaderRoute = new AppUploaderRouteDto();
        uploaderRoute.url = container.data('routeUpload');
        uploaderRoute.method = HttpVerbsEnum.POST;
        const uploaderDto = new AppUploaderDto();
        uploaderDto.id = 'category-image-uploader';
        uploaderDto.parent = container;
        uploaderDto.route = uploaderRoute;
        uploaderDto.onComplete = async data => this.onUploadCompleted(data);
        uploaderDto.onRemove = async () => await this.removeImage('Removing previous category image');
        uploaderDto.customParams = { type: container.data('type') };
        uploaderDto.zIndex = 3000;
        uploaderDto.progressBarColor = '#725C18';

        this.addUploader(uploaderDto);

        const formResetButton = selector(this.form.form.querySelector('button[type="reset"]'));
        this.addUploaderFormResetHandler(formResetButton);

        selector(modalDto.openerButtonSelector)
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
    }
}
