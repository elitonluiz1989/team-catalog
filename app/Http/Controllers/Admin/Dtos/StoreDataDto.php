<?php

namespace App\Http\Controllers\Admin\Dtos;

class StoreDataDto {
    public function __construct(
        public array $data,
        public string $notFoundMessage,
        public string $errorMessage,
        public string $successMessage
    ) {}
}