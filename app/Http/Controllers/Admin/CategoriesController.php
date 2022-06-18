<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Dtos\StoreDataDto;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Categories\CategoryCreateRequest;
use App\Http\Requests\Admin\Categories\CategoryUpdateRequest;
use App\Models\Category;
use App\Services\FileService\FileService;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller
{
    public function __construct(FileService $fileService) {
        $this->fileService = $fileService;
        $this->storeDataDto = new StoreDataDto(
            [],
            'Category not found.',
            'Category was not saved.',
            'Category was saved.'
        );
    }
    
    public function index(): View|Factory {
        $categories = Category::paginate(11);

        return view('admin.categories.index')
            ->with('categories', $categories);
    }

    public function find(int $categoryId): Category {
        $category = Category::find($categoryId);

        if ($category ==  null) {
            abort(404, 'Category not found.');
        }

        return $category;
    }

    public function create(CategoryCreateRequest $request): string {
        $this->storeDataDto->data = $this->manageDataWithImage($request->input(), 'image', 'images');
        $results = $this->storeData($this->storeDataDto);

        if ((bool)$results->hasErrors) {
            abort($results->statusCode, $results->message);
        }

        return $results->message;
    }

    public function update(CategoryUpdateRequest $request): string {
        $this->storeDataDto->data = $this->manageDataWithImage($request->input(), 'image', 'images');
        $results = $this->storeData($this->storeDataDto);

        if ((bool)$results->hasErrors) {
            abort($results->statusCode, $results->message);
        }

        if (!empty($data['image_removed']) && Storage::exists($data['image_removed'])) {
            $this->fileService->delete([ $request->input('image_removed') ]);
        }

        return $results->message;
    }

    public function delete($id): string {
        $category = Category::find($id);
        $isDeleted = $category->delete();

        if (!$isDeleted) {
            abort(404, 'Category was not deleted.');
        }

        return 'Category was deleted.';
    }

    public function lastOrder(): int {
        return Category::max('order') ?? 0;
    }

    protected function getModel($data): ?Category {
        if (empty($data['id'])) {
            return new Category();
        }

        return Category::find($data['id']);
    }
}
