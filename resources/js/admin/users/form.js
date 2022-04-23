import {AppFormDto} from "../../core/AppForm/AppFormDto";
import {AppFormMessageDto} from "../../core/AppFormMessage/AppFormMessageDto";
import {AppModalDto} from "../../core/AppModal/AppModalDto";
import {AppForm} from "../../core/AppForm/AppForm";

/**
 *
 * @returns {AppForm}
 */
export function defineForm() {
    const form = document.getElementById('user-form');
    const settings = new AppFormDto();
    settings.form = form;

    settings.message = new AppFormMessageDto();
    settings.message.container = '#user-form-messages';

    settings.modal = new AppModalDto(
        '#user-store-modal',
        '#user-store-modal-opener-btn',
        '#user-store-modal-dismiss-btn'
    );

    const formHandler = new AppForm(settings);
    formHandler.addInvalidFieldEventHandler();
    formHandler.addSubmitEventHandler();

    return formHandler;
}
