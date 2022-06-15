import {Entity} from "../../core/Entity";

export class Category extends Entity{
    constructor(
        id = null,
        name = null,
        order = null
    ) {
        super(id)
        this.name = name;
        this.order = order;
    }

    /**
     * 
     * @param {any} data 
     */
    fill(data) {
        Entity.fillEntity(this, data);
    }
}
