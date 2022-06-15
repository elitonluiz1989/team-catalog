import {AppModalDto} from "../../core/AppModal/Dtos/AppModalDto";
import {AppRequestStatic} from "../../core/AppRequest/AppRequestStatic";
import {isNullOrWhiteSpace, selector} from "../../core/helpers";

import {AdminBaseComponent} from "../commom/AdminBaseComponent";
import {AdminEditEventDto} from "../commom/Dtos/AdminEditEventDto";
import {AdminRemoveEventDto} from "../commom/Dtos/AdminRemoveEventDto";

import {Category} from "./Category";

export class CategoriesComponent extends AdminBaseComponent {
    route = '/categories';

    run() {
        const appModalDto = new AppModalDto(
            '#category-form-modal',
            '#category-form-modal-opener-btn',
            '#category-form-modal-dismiss-btn'
        );
        this.configureform(
            '#category-form',
            '#category-form-messages',
            appModalDto
        );
        this.configureMask();

        selector(appModalDto.openerButtonSelector)
            .on('click', async () => {
                if (!isNullOrWhiteSpace(this.appForm.form['order']?.value)){
                    return;
                }

                await this.appMask.show();

                const response = await AppRequestStatic.get(`${this.route}/order/last`);

                if (!response.hasErrors && !isNaN(response.data)) {
                    this.appForm.form['order'].value = (+response.data) + 1;
                }

                await this.appMask.hide();
            });

        /**
         *
         * @param {AppForm} appForm
         * @param {any} data
         */
        const fillForm = (appForm, data) => {
            const category = new Category();
            category.fill(data);

            appForm.fill(category);
            appForm.createRecordIdentifier('id', category.id);
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
    }
}
