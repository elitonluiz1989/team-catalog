@extends('layout.admin')

@section('view')
    <div class="container-fluid">
        <div class="page-title row">
            <div class="col-12">
                <h2>Products</h2>
            </div>
        </div>

        <div class="row justify-content-center justify-content-md-start mt-3">
            @foreach($products as $product)
                <div class="col-8 col-md-4 col-lg-3 col-xl-2 mb-3">
                    <div class="product record w-100 d-flex flex-column ps-2 pe-2">
                        <div class="record__cover d-flex flex-fill w-100 align-items-center justify-content-center mt-2 overflow-hidden">
                            <img
                                src="{{ $product->image_src }}"
                                alt="{{ $product->name }} image"
                                class="img-fluid">

                            <input type="hidden" name="image" value="{{ $product->image }}">
                        </div>

                        <div class="record__item record__item--bordered pt-1 pb-1 text-center text-break">
                            <h5 class="text-break">{{ $product->name }}</h5>
                        </div>

                        <div class="record__item pt-1 pb-1 record__item--bordered text-center text-break">
                            <h5 class="text-break">
                                <a
                                    href="{{ $product->link }}"
                                    class="product__link d-block ms-auto me-auto text-center"
                                    target="_blank">Link</a>
                            </h5>
                        </div>

                        <div class="record__item record__item--bordered pt-1 pb-1 text-center text-break">
                            <h5 class="text-break">{{ $product->category->name }}</h5>
                        </div>

                        <div class="record__item d-flex justify-content-evenly pt-2 pb-3">
                            <button
                                class="product__edit-action btn btn-outline-secondary"
                                data-find-route="{{ route('products.find', $product->id) }}"
                                data-action-route="{{ route('products.update', $product->id) }}">
                                <i class="fas fa-pen"></i>
                            </button>

                            <button
                                class="product__remove-action btn btn-outline-secondary"
                                data-action-route="{{ route('products.delete', $product->id) }}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            @endforeach

            <div class="col-8 col-md-4 col-lg-3 col-xl-2 d-flex mb-3">
                <button
                    id="product-form-modal-opener-btn"
                    class="product record record--add btn w-100 d-flex align-items-center justify-content-center text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target="#product-form-modal">
                    <i class="fas fa-plus"></i>
                </button>
            </div>

            {{ $products->onEachSide(5)->links() }}

            <x-modals.form-modal
                modal-id="product-form-modal"
                modal-dismiss-btn-id="product-form-modal-dismiss-btn"
                title="Product"
                form-id="product-form"
                form-action="{{ route('products.create') }}"
                form-method="{{ \App\Enums\HttpMethodsEnum::POST }}">
                @include('admin.products.form', [ 'categories' => $categories ])
            </x-modals.form-modal>
        </div>
    </div>
@endsection
