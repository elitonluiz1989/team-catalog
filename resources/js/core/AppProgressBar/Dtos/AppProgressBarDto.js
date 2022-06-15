import {BaseDto} from "../../Dtos/BaseDto";

export class AppProgressBarDto extends BaseDto {
    /**
     *
     * @param {HTMLElement} parent
     * @param {?string} barColor
     * @param {?string} textColor
     * @param {?number} zIndex
     */
    constructor(
        parent,
        barColor = null,
        textColor = null,
        zIndex = null
    ) {
        super([
            'barColor',
            'textColor',
            'zIndex'
        ]);

        this.parent = parent;
        this.barColor = barColor ?? 'red';
        this.textColor = textColor ?? 'white';
        this.zIndex = zIndex ?? 9050;
    }
}
