<?php

namespace App\Http\Controllers;

use App\Enums\UploadTypeEnum;
use App\Http\Requests\Files\FilesRequest;
use App\Http\Requests\Files\FileUploadRequest;
use App\Services\FileService\Dtos\FileUploadedDto;
use App\Services\FileService\FileService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Intervention\Image\ImageManagerStatic as Image;

class FilesController extends Controller
{
    private FileService $service;

    public function __construct(FileService $service)
    {
        $this->service = $service;
        $this->service->folder = config('filesystem.disks', [])[config('filesystem.default', 'local')] ?? '';
    }

    public function image(Request $request, string $image): Response
    {
        $this->service->subFolder = config('filesystems.folders.images');
        $path = $this->service->getFullPath($image);

        return $this->renderImage($request, $path);
    }

    /**
     * @param FileUploadRequest $request
     * @return FileUploadedDto[]
     */
    public function upload(FileUploadRequest $request): array
    {
        $this->service->subFolder = $this->getUploadFolder($request->input('type', UploadTypeEnum::FILES));
        $this->service->route = $request->input('route');
        $files = $request->file();
        $results = [];

        foreach ($files as $file) {
            $results[] = $this->service->upload($file);
        }

        return $results;
    }

    public function delete(FilesRequest $request): bool
    {
        $files = $request->input('files');

        return $this->service->delete($files);
    }

    private function renderImage(Request $request, string $path): Response
    {
        $img = Image::make($path);

        if ($request->has('width') || $request->has('height')) {
            $width = $request->get('width') ?? $request->get('height');
            $height = $request->get('height') ?? $request->get('width');

            $img->resize(
                $width,
                $height,
                function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                }
            );
        }
        $format = $img->extension;

        return $img->response($format);
    }

    private function getUploadFolder(int $uploadType): string {
        return match ($uploadType) {
            UploadTypeEnum::IMAGES => config('filesystems.folders.images', 'images'),
            default => config('filesystems.folders.files', 'files')
        };
    }
}
