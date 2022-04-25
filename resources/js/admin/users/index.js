import {AppModalDto} from "../../core/AppModal/AppModalDto";

import {AdminBaseComponent} from "../commom/AdminBaseComponent";
import {
    AdminRecordEditEventDto,
    AdminEventsDto,
    AdminRecordRemoveEventDto
} from "../commom/DTO/AdminEventsDto";
import {AdminFormDto} from "../commom/DTO/AdminFormDto";

import {User} from "./User";

export class UserComponent extends AdminBaseComponent {
    route = 'users';

    run() {
        const adminFormDto = new AdminFormDto(
            '#user-form',
            '#user-form-messages'
        );
        const appModalDto = new AppModalDto(
            '#user-form-modal',
            '#user-form-modal-opener-btn',
            '#user-form-modal-dismiss-btn'
        );
        const appForm = this.defineForm(adminFormDto, appModalDto);

        /**
         *
         * @param {AppForm} form
         * @param {AppResponse} response
         */
        const fillForm = (form, response) => {
            const user = new User();
            user.fill(response.data);

            form.fill(user);
            form.createRecordIdentifier('id', user.id);
            form.disableFields('email', 'password');
            form.removeDisabledFieldsOnSubmit()
        };
        const adminRecordEditEventDto = new AdminRecordEditEventDto(
            '.user__edit-action',
            'findRoute',
            'User edit route is not defined.',
            'actionRoute',
            fillForm
        );
        const adminRecordRemoveEventDto = new AdminRecordRemoveEventDto(
            '.user__remove-action',
            'Are you sure to remove this user?',
            'actionRoute'
        );
        const adminRecordsEventsDto = new AdminEventsDto(
            appForm,
            adminRecordEditEventDto,
            adminRecordRemoveEventDto
        );
        this.defineEvents(adminRecordsEventsDto);
    }
}
