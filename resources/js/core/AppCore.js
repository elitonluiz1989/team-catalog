import {AppRequestStatic} from "./AppRequest/AppRequestStatic";

export class AppCore {
    /**
     *
     * @type {AppCoreComponent[]}
     */
    #components = [];

    /**
     *
     * @param {AppCoreComponent[]} components
     */
    constructor(components) {
        this.#components = components;
    }

    run() {
        const currentRoute = AppRequestStatic.route.routeIdentifier;
        const component = this.#components.find(c => c.route === currentRoute);

        if (!component) {
            throw new Error('Component not defined');
        }

        component.run();
    }
}
