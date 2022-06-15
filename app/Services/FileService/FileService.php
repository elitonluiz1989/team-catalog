<?php

namespace App\Services\FileService;

use App\Services\FileService\Dtos\FileDeletedDto;
use App\Services\FileService\Dtos\FileUploadDto;
use App\Services\FileService\Dtos\FileUploadedDto;
use Illuminate\Support\Facades\Storage;

class FileService
{
    /**
     *
     * @param string[] $files
     * @return FileDeletedDto[]
     */
    public function delete(array $files): array {
        $results = [];

        foreach ($files as $file) {
            $path = $this->getFullPath($file);

            $fileDeleted = new FileDeletedDto();
            $fileDeleted->file = $file;
            $fileDeleted->deleted = \unlink($path);

            $results[] = $fileDeleted;
        }

        return $results;
    }

    public function upload(FileUploadDto $params): FileUploadedDto {
        $dto = new FileUploadedDto();
        $filename = uniqid(rand(), true) . '.' . time() . '.' . $params->file->extension();
        $result = $params->file->storeAs($params->destination, $filename);

        if (empty($result)) {
            $dto->error = "{$params->file->getFilename()} was not uploaded.";

            return $dto;
        }

        if (!empty($params->viewRoute)) {
            $dto->url = route($params->viewRoute, ['folder' => $params->destination, 'filename' => $filename, 'type' => $params->type->key]);
        }
        
        $dto->filename = $filename;
        $dto->path = $this->getRelativePath($params->destination, $filename);

        return $dto;
    }

    public function move(string $file, string $folder): string {
        $source = $this->getFullPath($file);
        $destination = $this->getRelativePath($folder, $this->getFileName($file));

        if (!Storage::move($file, $destination)) {
            return '';
        }

        return $destination;
    }

    public function getRelativePath(string $folder, string $filename = null): string {
        return $folder . DIRECTORY_SEPARATOR . $filename;
    }

    public function getFullPath(string $filename, ?string $folder = null): string {
        $path = empty($folder) ? $filename : $this->getRelativePath($folder, $filename);

        return Storage::path($path);
    }

    private function getFileName(string $image): string {
        return basename($image);
    }
}
