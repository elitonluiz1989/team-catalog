@php
$imageSize = 32;
@endphp

<div class="container-fluid">
    <div class="row">
        <div id="category-form-messages" class="col-12"></div>
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
                    id="category-image"
                    class="ms-auto me-auto"
                    width="{{ $imageSize }}"
                    height="{{ $imageSize }}">
                
                <input type="hidden" name="image">
            </div>
        </div>
    </div>

    <div class="form-field row">
        <label for="category-name" class="col-12">Name</label>

        <div class="col-12">
            <input
                type="text"
                id="category-name"
                class="form-control"
                name="name">
        </div>
    </div>

    <div class="form-field row mb-2">
        <label for="category-order" class="col-12">Order</label>

        <div class="col-3 col-sm-3">
            <input
                type="number"
                id="category-order"
                class="form-control"
                name="order"
                min="1"
                max="999">
        </div>
    </div>
</div>
