<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Categories\CategoryCreateRequest;
use App\Http\Requests\Admin\Categories\CategoryUpdateRequest;
use App\Models\Category;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;

class CategoriesController extends Controller
{
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
        $category = new Category();
        $category->fill($request->input());
        $isSaved = $category->save();

        if (!$isSaved) {
            abort(404, 'Category was not saved.');
        }

        return 'Category was saved.';
    }

    public function update(CategoryUpdateRequest $request): string {
        $category = Category::find($request->input('id'));
        $category->fill($request->input());
        $isSaved = $category->save();

        if (!$isSaved) {
            abort(404, 'Category was not saved.');
        }

        return 'Category was saved.';
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
}
