@php
$categoryImageSize = 16;
$productImageSize = 64;
@endphp

@extends('layout.default')

@section('view')
    <div class="row">
        @forelse ($categories as $category)
            <div class="col-12">
                <div class="row">
                    <div class="col-12 d-flex align-items-center">
                        <img src="{{ asset('images/empty.png') }}&width={{ $categoryImageSize }}"
                            class="me-2"
                            width="{{ $categoryImageSize }}"
                            height="{{ $categoryImageSize }}">

                        <h5 class="mt-2 mb-2">{{ $category->name }}</h5>
                    </div>
                </div>

                <div class="row mt-2">
                    @foreach ($category->products as $product)
                        <div class="col-4 col-md-2 col-xl-1 pb-3" style="border: 1px solid red">
                            <a href="{{ $product->link }}" class="product-view d-flex flex-column justify-content-center">
                                <img src="{{ $product->image_src }}&width={{ $productImageSize }}"
                                    alt="{{ $product->name }} image"
                                    class="m-auto"
                                    width="{{ $productImageSize }}"
                                    height="{{ $productImageSize }}">
    
                                <div class="product-view__name text-center break-words">{{ $product->name }}</div>
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        @empty
            <div class="col-12">
                <p>No records</p>
            </div>
        @endforelse
    </div>
@endsection