<?php

namespace App\Http\Controllers\Admin\Dtos;

class ActionResultDto {
    public function __construct(
        public ?int $statusCode = null,
        public ?string $message = null,
        public ?bool $hasErrors = null
    ) {}
}