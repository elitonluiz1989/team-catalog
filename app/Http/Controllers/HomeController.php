<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(): View {
        $categories = Category::has('products')
            ->with('products')
            ->orderBy('order')
            ->get();

        return view('home')
            ->with('categories', $categories);
    }
}
