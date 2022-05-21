import {BaseDto} from "../../Dtos/BaseDto";

export class AppUploaderDto extends BaseDto {
    /**
     *
     * @param {Selector} parent
     * @param {string} route
     * @param {?Function} onComplete
     * @param {?object} customParams
     * @param {?string} id
     * @param {?number} zIndex
     * @param {?string} progressBarColor
     * @param {?string} progressBarTextColor
     */
    constructor(
        parent,
        route,
        onComplete = null,
        customParams = null,
        id = null,
        zIndex = null,
        progressBarColor = null,
        progressBarTextColor = null
    ) {
        super([
            'onComplete',
            'customParams',
            'id',
            'zIndex',
            'progressBarColor',
            'progressBarTextColor'
        ]);

        this.parent = parent;
        this.route = route;
        this.onComplete = onComplete;
        this.customParams = customParams;
        this.id = id;
        this.zIndex = zIndex ?? 9050;
        this.progressBarColor = progressBarColor;
        this.progressBarTextColor = progressBarTextColor;
    }
}
