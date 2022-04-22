export class Entity {
    /**
     *
     * @param {?number} id
     */
    constructor(id= null) {
        this.id = id;
    }

    static fillEntity(base, data) {
        for (const item in data) {
            if (base.hasOwnProperty(item)) {
                base[item] = data[item];
            }
        }
    }
}
