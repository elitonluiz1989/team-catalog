import {Entity} from "../../core/Entity";

export class Product extends Entity {
    constructor(
        id = null,
        name = null,
        image = null,
        link = null,
        category_id = null,
    ) {
        super(id);

        this.name = name;
        this.image = image;
        this.link = link;
        this.category_id = category_id;
    }

    /**
     * 
     * @param {any} data 
     */
    fill(data) {
        Entity.fillEntity(this, data);
    }
}
