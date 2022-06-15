<?php

namespace App\Services\FileService\Dtos;

class FileUploadedDto {
    public function __construct(
        public ?string $url = null,
        public ?string $filename = null,
        public ?string $path = null,
        public ?string $error = null
    )
    {}
}
