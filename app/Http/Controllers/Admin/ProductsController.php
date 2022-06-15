<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Dtos\ActionResultDto;
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

    public function __construct(private FileService $fileService) {}

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
        $results = $this->storeData($request->input());

        if ((bool)$results->hasErrors) {
            abort($results->statusCode, $results->message);
        }

        return $results->message;
    }

    public function update(ProductUpdateRequest $request) {
        $results = $this->storeData($request->input());

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

    private function manageData(array $data): array {
        if (empty($data['image'])) {
            return $data;
        }

        $image = $this->fileService->move($data['image'], 'images');

        if (!empty($image)) {
            $data['image'] = $image;
        }

        return $data;
    }

    private function storeData(array $data): ActionResultDto {
        $dto = new ActionResultDto();
        
        $data = $this->manageData($data);

        if (empty($data['id'])) {
            $product = new Product();
        } else {
            $product = Product::firstOrNew(['id' => $data['id']]);
        }

        $product->fill($data);
        $isSaved = $product->save();

        if (!$isSaved) {
            $dto->statusCode = 404;
            $dto->message = 'Product was not saved.';
            $dto->hasErrors = true;
        }

        $dto->statusCode = 200;
        $dto->message = 'Product was saved.';

        return $dto;
    }
}
