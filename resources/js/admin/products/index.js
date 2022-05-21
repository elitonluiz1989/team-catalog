import {AppModalDto} from "../../core/AppModal/Dtos/AppModalDto";

import {AdminBaseComponent} from "../commom/AdminBaseComponent";
import {AdminEditEventDto} from "../commom/Dtos/AdminEditEventDto";
import {AdminRemoveEventDto} from "../commom/Dtos/AdminRemoveEventDto";

import {Product} from "./Product";
import {AppUploader} from "../../core/AppUploader";
import {selector} from "../../core/helpers";
import {AppUploaderDto} from "../../core/AppUploader/Dtos/AppUploaderDto";

export class ProductsComponent extends AdminBaseComponent {
    route = '/products';

    run() {
        const modalDto = new AppModalDto();
        modalDto.modalSelector = '#product-form-modal';
        modalDto.openerButtonSelector = '#product-form-modal-opener-btn';
        modalDto.dismissButtonSelector = '#product-form-modal-dismiss-btn';
        this.configureAppForm(
            '#product-form',
            '#product-form-messages',
            modalDto
        );
        this.configureAppMask();

        const productImage = document.getElementById('product-image');
        const imgSize = {
            height: productImage.getAttribute('height'),
            width: productImage.getAttribute('width')
        };
        const container = selector('#uploader-image');
        const imageField = document.querySelector('input[name="image"]');
        const uploaderDto = new AppUploaderDto();
        uploaderDto.id = 'product-image-uploader';
        uploaderDto.parent = container;
        uploaderDto.fieldName = 'image',
        uploaderDto.route = container.data('routeUpload');
        uploaderDto.onComplete = async (data) => {
            return new Promise((resolve, reject) => {
                let queryString = '';

                if (imgSize.height) {
                    queryString += '?height=' + imgSize.height;
                }

                if (imgSize.width) {
                    queryString += (queryString.length === 0) ? '?' : '&';
                    queryString += 'width=' + imgSize.width;
                }

                const src = data[0].url + queryString;

                productImage.onload = () => resolve(productImage);
                productImage.onerror = reject;
                productImage.setAttribute('src', src);

                imageField.value = data[0].path;
            });
        }
        uploaderDto.customParams = {
            type: container.data('type'),
            route: container.data('routeView')
        };
        uploaderDto.zIndex = 3000;
        uploaderDto.progressBarColor = '#725C18';
        AppUploader.create(uploaderDto);

        const editEventDto = new AdminEditEventDto();
        editEventDto.selector = '.product__edit-action';
        editEventDto.findRouteKey = 'findRoute';
        editEventDto.actionRouteKey = 'actionRoute';
        editEventDto.callback = (appForm, data) => {
            const product = new Product();
            product.fill(data);

            appForm.fill(product);
            appForm.createRecordIdentifier('id', product.id);
        };
        this.addEditEvent(editEventDto);

        const removeEventDto = new AdminRemoveEventDto();
        removeEventDto.selector = '.product__remove-action';
        removeEventDto.actionRouteKey = 'actionRoute';
        removeEventDto.confirmMessager = 'Are you sure to remove this product?';
        this.addRemoveEvent(removeEventDto);
    }
}
