import {BaseDto} from "../../Dtos/BaseDto";
import { AppMask } from './../../AppMask/AppMask';
import { Selector } from './../../Selector';

export class AppUploaderRouteDto extends BaseDto {
    constructor(
        url = null,
        method = null 
    ) {
        super();

        this.url = url;
        this.method = method;
    }
}

export class AppUploaderDto extends BaseDto {
    /**
     *
     * @param {?Selector} parent
     * @param {?AppUploaderRouteDto} route
     * @param {?AppMask} mask
     * @param {?Function} onComplete
     * @param {?object} customParams
     * @param {?string} id
     * @param {?number} zIndex
     * @param {?string} progressBarColor
     * @param {?string} progressBarTextColor
     */
    constructor(
        parent = null,
        route = null,
        mask = null,
        onComplete = null,
        customParams = null,
        id = null,
        zIndex = null,
        progressBarColor = null,
        progressBarTextColor = null
    ) {
        super([
            'mask',
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
        this.mask = mask;
        this.customParams = customParams;
        this.id = id;
        this.zIndex = zIndex ?? 9050;
        this.progressBarColor = progressBarColor;
        this.progressBarTextColor = progressBarTextColor;
    }
}
