import {AppModalDto} from "../../core/AppModal/Dtos/AppModalDto";

import {AdminBaseComponent} from "../commom/AdminBaseComponent";
import {AdminEditEventDto} from "../commom/Dtos/AdminEditEventDto";
import {AdminRemoveEventDto} from "../commom/Dtos/AdminRemoveEventDto";

import {User} from "./User";

export class UserComponent extends AdminBaseComponent {
    route = '/users';

    run() {
        const modalDto = new AppModalDto();
        modalDto.modalSelector = '#user-form-modal';
        modalDto.openerButtonSelector = '#user-form-modal-opener-btn';
        modalDto.dismissButtonSelector = '#user-form-modal-dismiss-btn';
        const formDto = this.getFormDto('#user-form', '#user-form-messages');
        formDto.modal = modalDto;
        this.configureform(formDto);
        this.configureMask();

        /**
         *
         * @param {AppForm} form
         * @param {any} data
         */
        const fillForm = (form, data) => {
            const user = new User();
            user.fill(data);

            form.fill(user);
            form.createRecordIdentifier('id', user.id);
            form.disableFields('email', 'password');
            form.removeDisabledFieldsOnSubmit()
        };
        const editEventDto = new AdminEditEventDto();
        editEventDto.selector = '.user__edit-action';
        editEventDto.findRouteKey = 'findRoute';
        editEventDto.actionRouteKey = 'actionRoute';
        editEventDto.callback = fillForm;

        this.addEditEvent(editEventDto);

        const removeEventDto = new AdminRemoveEventDto();
        removeEventDto.selector = '.user__remove-action';
        removeEventDto.actionRouteKey = 'actionRoute';
        removeEventDto.confirmMessage = 'Are you sure to remove this user?';

        this.addRemoveEvent(removeEventDto);
    }
}
