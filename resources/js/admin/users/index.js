import {AppModalDto} from "../../core/AppModal/Dtos/AppModalDto";

import {AdminBaseComponent} from "../commom/AdminBaseComponent";
import {AdminEditEventDto} from "../commom/Dtos/AdminEditEventDto";
import {AdminRemoveEventDto} from "../commom/Dtos/AdminRemoveEventDto";

import {User} from "./User";

export class UserComponent extends AdminBaseComponent {
    route = '/users';

    run() {
        const appModalDto = new AppModalDto(
            '#user-form-modal',
            '#user-form-modal-opener-btn',
            '#user-form-modal-dismiss-btn'
        );
        this.configureAppForm(
            '#user-form',
            '#user-form-messages',
            appModalDto
        );
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
        const adminRecordEditEventDto = new AdminEditEventDto(
            '.user__edit-action',
            'findRoute',
            'actionRoute',
            fillForm
        );

        this.addEditEvent(adminRecordEditEventDto);

        const adminRemoveEventDto = new AdminRemoveEventDto(
            '.user__remove-action',
            'actionRoute',
            'Are you sure to remove this user?'
        );

        this.addRemoveEvent(adminRemoveEventDto);
    }
}
