import 'bootstrap/dist/js/bootstrap';

import {createApp} from "./core/helpers";

import {UserComponent} from "./admin/users";

const app = createApp([
    new UserComponent()
]);
app.run();
