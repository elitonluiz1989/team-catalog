@extends('layout.admin')

@section('view')
    <div class="container-fluid">
        <div class="page-title row">
            <div class="col-12">
                <h2>Categories</h2>
            </div>
        </div>

        <div class="row justify-content-center justify-content-md-start mt-3">
            @foreach($categories as $category)
                <div class="col-8 col-md-4 col-lg-3 col-xl-2 mb-3">
                    <div class="record w-100 d-flex flex-column ps-2 pe-2">
                        <div class="record__item--bordered d-flex flex-fill w-100 align-items-center justify-content-center">
                            <h3 class="text-break">{{ $category->name }}</h3>
                        </div>

                        <div class="record__item record__item--bordered pt-3 pb-3 text-center text-break">Order {{ $category->order }}</div>

                        <div class="record__item d-flex justify-content-evenly pt-2 pb-3">
                            <button
                                class="category__edit-action btn btn-outline-secondary"
                                data-find-route="{{ route('categories.find', $category->id) }}"
                                data-action-route="{{ route('categories.update', $category->id) }}">
                                <i class="fas fa-pen"></i>
                            </button>

                            <button
                                class="category__remove-action btn btn-outline-secondary"
                                data-action-route="{{ route('categories.delete', $category->id) }}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            @endforeach

            <div class="col-8 col-md-4 col-lg-3 col-xl-2 d-flex mb-3">
                <button
                    id="category-form-modal-opener-btn"
                    class="record record--add btn w-100 d-flex align-items-center justify-content-center text-decoration-none"
                    data-bs-toggle="modal"
                    data-bs-target="#category-form-modal">
                    <i class="fas fa-plus"></i>
                </button>
            </div>

            {{ $categories->onEachSide(5)->links() }}

            <x-modals.form-modal
                modal-id="category-form-modal"
                modal-dismiss-btn-id="category-form-modal-dismiss-btn"
                title="Category"
                form-id="category-form"
                form-action="{{ route('categories.create') }}"
                form-method="{{ \App\Enums\HttpMethodsEnum::POST }}">
                @include('admin.categories.form')
            </x-modals.form-modal>
        </div>
    </div>
@endsection
