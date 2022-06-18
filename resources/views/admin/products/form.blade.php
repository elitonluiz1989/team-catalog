@php
$imageSize = 64;
@endphp

<div class="container-fluid">
    <div class="row">
        <div id="product-form-messages" class="col-12"></div>
    </div>

    <div class="form-field row mb-1">
        <div class="col-12">
            <div
                id="uploader-image"
                class="input-group"
                data-type="{{ \App\Enums\FileTypeEnum::IMAGE }}"
                data-route-upload="{{ route('files.upload') }}"
                data-route-remove="{{ route('files.delete') }}"
                data-route-view="files.images.view">
                <div class="w-100 text-center">
                    <small>Click to upload an image</small>
                </div>

                <img src="{{ asset('images/empty.png') }}"
                    alt="uploaded image"
                    id="product-image"
                    class="ms-auto me-auto"
                    width="{{ $imageSize }}"
                    height="{{ $imageSize }}">
                
                <input type="hidden" name="image">
            </div>
        </div>
    </div>

    <div class="form-field row mb-2">
        <label for="product-name" class="col-12">Name</label>

        <div class="col-12">
            <input
                type="text"
                id="product-name"
                class="form-control"
                name="name">
        </div>
    </div>

    <div class="form-field row mb-2">
        <label for="product-link" class="col-12">Link</label>

        <div class="col-12">
            <input
                type="text"
                id="product-link"
                class="form-control"
                name="link">
        </div>
    </div>

    <div class="form-field row mb-2">
        <label for="product-category-id" class="col-12">Category</label>

        <div class="col-12">
            <select
                id="product-category-id"
                class="form-control"
                name="category_id">
                <option>...</option>
                @foreach($categories as $category)
                    <option value="{{ $category->id }}">{{ $category->name }}</option>
                @endforeach
            </select>
        </div>
    </div>
</div>
