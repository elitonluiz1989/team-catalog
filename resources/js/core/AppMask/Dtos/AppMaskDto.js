import {BaseDto} from "../../Dtos/BaseDto";

export class AppMaskDto extends BaseDto {
    /**
     *
     * @param {?string} id
     * @param {?HTMLElement} parent
     * @param {?Boolean} withLoading
     * @param {?string} position
     * @param {?string} backgroundColor
     * @param {?number} zIndex
     * @param {?string} spinnerColor
     */
    constructor(
        id = null,
        parent = null,
        withLoading = null,
        position = null,
        backgroundColor = null,
        zIndex = null,
        spinnerColor = null
    ) {
        super();

        this.noValidate = true;

        this.id = id;
        this.parent = parent;
        this.withLoading = withLoading ?? true;
        this.position = position ?? 'fixed';
        this.backgroundColor = backgroundColor ?? '#333';
        this.zIndex = zIndex ?? 9000;
        this.spinnerColor = spinnerColor ?? 'white';
    }

    /**
     * 
     * @param {object} object 
     * @returns {boolean}
     */
    static isInstanceOf(object) {
        return object instanceof AppMaskDto;
    }

    /**
     * 
     * @returns {AppMaskDto}
     */
    copy() {
        return Object.assign(new AppMaskDto(), this);
    }
}
