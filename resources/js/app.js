import 'bootstrap/dist/js/bootstrap';

import {createApp} from "./core/helpers";

import {CategoriesComponent} from "./admin/categories";
import {ProductsComponent} from "./admin/products";
import {UserComponent} from "./admin/users";

const app = createApp([
    new UserComponent(),
    new CategoriesComponent(),
    new ProductsComponent()
]);
app.run();
