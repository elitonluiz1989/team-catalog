<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Dtos\StoreDataDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Products\ProductCreateRequest;
use App\Http\Requests\Admin\Products\ProductUpdateRequest;
use App\Models\Category;
use App\Models\Product;
use App\Services\FileService\FileService;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    public function __construct(FileService $fileService) {
        $this->fileService = $fileService;
        $this->storeDataDto = new StoreDataDto(
            [],
            'Product not found.',
            'Product was not saved.',
            'Product was saved.'
        );
    }

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
        $this->storeDataDto->data = $this->manageDataWithImage($request->input(), 'image', 'images');
        $results = $this->storeData($this->storeDataDto);

        if ((bool)$results->hasErrors) {
            abort($results->statusCode, $results->message);
        }

        return $results->message;
    }

    public function update(ProductUpdateRequest $request) {
        $this->storeDataDto->data = $this->manageDataWithImage($request->input(), 'image', 'images');
        $results = $this->storeData($this->storeDataDto);

        if ((bool)$results->hasErrors) {
            abort($results->statusCode, $results->message);
        }

        if (Storage::exists($request->input('image_removed'))) {
            $this->fileService->delete([ $request->input('image_removed') ]);
        }

        return $results->message;
    }

    public function delete($id): string {
        $product = Product::find($id);
        $isDeleted = $product->delete();

        if (!$isDeleted) {
            abort(404, 'Product was not deleted.');
        }

        return 'Product was deleted.';
    }

    protected function getModel($data): ?Product {
        if (empty($data['id'])) {
            return new Product();
        }

        return Product::find($data['id']);
    }
}
