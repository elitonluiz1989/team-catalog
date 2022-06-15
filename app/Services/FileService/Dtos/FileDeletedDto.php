<?php

namespace App\Services\FileService\Dtos;

class FileDeletedDto {
    public function __construct(
        public ?string $file = null,
        public ?bool $deleted = null
    ) {}
}