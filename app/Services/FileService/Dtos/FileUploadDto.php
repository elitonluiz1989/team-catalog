<?php

namespace App\Services\FileService\Dtos;

use App\Enums\FileTypeEnum;
use Illuminate\Http\UploadedFile;

class FileUploadDto {
    public function __construct(
        public UploadedFile $file, 
        public string $destination,
        public FileTypeEnum $type,
        public ?string $viewRoute = null
    ) {}
}