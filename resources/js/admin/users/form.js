import {AppFormSettings} from "../../core/AppForm/AppFormSettings";
import {AppFormMessageSettings} from "../../core/AppFormMessage/AppFormMessageSettings";
import {AppModalSettings} from "../../core/AppModal/AppModalSettings";
import {AppForm} from "../../core/AppForm/AppForm";

(function () {
    const form = document.getElementById('user-form');
    const settings = new AppFormSettings();
    settings.form = form;

    settings.message = new AppFormMessageSettings();
    settings.message.container = '#user-form-messages';

    settings.modal = new AppModalSettings(
        '#user-store-modal',
        '#user-store-modal-opener-btn',
        '#user-store-modal-dismiss-btn'
    );

    const formHandler = new AppForm(settings);
    formHandler.addInvalidFieldEventHandler();
    formHandler.addSubmitEventHandler();
})()
