import {Entity} from "../../core/Entity";

export class User extends Entity {
    /**
     *
     * @param {?number} id
     * @param {?string} name
     * @param {?string} email
     * @param {?string} password
     */
    constructor(
        id = null,
        name = null,
        email = null,
        password = null
    ) {
        super(id);

        this.name = name;
        this.email = email;
        this.password = password;
    }

    fill(data) {
        Entity.fillEntity(this, data);
    }
}
