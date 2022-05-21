<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\ProductCreateRequest;
use App\Http\Requests\Admin\Products\ProductUpdateRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Model;

class ProductsController extends Controller
{
    public function index(): View|Factory {
        $categories = Category::all();
        $products = Product::with('category')->paginate(11);

        return view('admin.products.index')
            ->with('categories', $categories)
            ->with('products', $products);
    }

    public function find(int $productId): Product|Model {
        $product = Product::with('category')->find($productId);

        if ($product ==  null) {
            abort(404, 'Product not found.');
        }

        return $product;
    }

    public function create(ProductCreateRequest $request): string {
        $product = new Product();
        $product->fill($request->input());
        $isSaved = $product->save();

        if (!$isSaved) {
            abort(404, 'Product was not saved.');
        }

        return 'Product was saved.';
    }

    public function update(ProductUpdateRequest $request): string {
        $product = Product::find($request->input('id'));
        $product->fill($request->input());
        $isSaved = $product->save();

        if (!$isSaved) {
            abort(404, 'Product was not saved.');
        }

        return 'Product was saved.';
    }

    public function delete($id): string {
        $product = Product::find($id);
        $isDeleted = $product->delete();

        if (!$isDeleted) {
            abort(404, 'Product was not deleted.');
        }

        return 'Product was deleted.';
    }
}
