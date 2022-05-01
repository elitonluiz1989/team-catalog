import 'bootstrap/dist/js/bootstrap';

import {createApp} from "./core/helpers";

import {CategoriesComponent} from "./admin/categories";
import {UserComponent} from "./admin/users";

const app = createApp([
    new UserComponent(),
    new CategoriesComponent()
]);
app.run();
