<?php

namespace App\Services\FileService;

use App\Services\FileService\Dtos\FileUploadedDto;
use Faker\Core\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public string $route;

    public string $folder;

    public string $subFolder;

    public function delete(array $images): bool
    {
        $files = [];

        foreach ($images as $image) {
            $filename = $this->getFileName($image);
            $files[] = $this->getRelativePath($filename);
        }

        return Storage::disk(env('FILESYSTEM_DRIVER'))->delete($files);
    }

    public function upload(UploadedFile $file): FileUploadedDto
    {
        $dto = new FileUploadedDto();
        $filename = uniqid(rand(), true) . '.' . time() . '.' . $file->extension();
        $result = $file->storeAs($this->getRelativePath(), $filename);

        if (empty($result)) {
            $dto->error = "{$file->getFilename()} was not uploaded.";

            return $dto;
        }

        $dto->url = route($this->route, ['filename' => $filename]);
        $dto->filename = $filename;
        $dto->path = $this->getRelativePath($filename);

        return $dto;
    }

    public function getRelativePath(string $filename = null): string
    {
        $path = $this->folder;

        if (null != $this->subFolder)
        {
            if (!empty($path)) {
                $path .= DIRECTORY_SEPARATOR;
            }

            $path .= $this->subFolder;
        }

        if (null != $filename)
        {
            $path .= DIRECTORY_SEPARATOR . $filename;
        }

        return $path;
    }

    public function getFullPath(string $filename = null): string {
        $path = $this->getRelativePath($filename);

        return Storage::path($path);
    }

    private function getFileName(string $image): string
    {
        return basename($image);
    }
}
