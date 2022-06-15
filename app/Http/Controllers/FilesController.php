<?php

namespace App\Http\Controllers;

use App\Enums\FileTypeEnum;
use App\Http\Requests\Files\FileUploadRequest;
use App\Http\Requests\Files\FilesRequest;
use App\Services\FileService\Dtos\FileUploadDto;
use App\Services\FileService\Dtos\FileUploadedDto;
use App\Services\FileService\FileService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Intervention\Image\ImageManagerStatic as Image;

class FilesController extends Controller
{
    public function __construct(private FileService $service) {}

    public function view(Request $request, string $folder, string $image)
    {
        $type = \strtoupper($request->input('type', 'files'));
        $path = $this->service->getFullPath($image, $folder);
        
        if (!\file_exists($path) || !FileTypeEnum::hasKey($type)) {
            \abort(404);
        }

        if (FileTypeEnum::getValue($type) == FileTypeEnum::IMAGE) {
            return $this->renderImage($request, $path);
        }

        return response()->file($path);
    }

    /**
     * @param FileUploadRequest $request
     * @return FileUploadedDto[]
     */
    public function upload(FileUploadRequest $request): array
    {
        $files = $request->file();
        $type =  FileTypeEnum::fromValue((int)$request->input('type', 0));
        $folder = env('TEMP_FOLDER', 'temp');
        $route = 'files.view';
        $results = [];

        foreach ($files as $file) {
            $dto = new FileUploadDto(
                $file,
                $folder,
                $type,
                $route
            );

            $results[] = $this->service->upload($dto);
        }

        return $results;
    }

    /**
     *
     * @param FilesRequest $request
     * @return FileDeletedDto[]
     */
    public function delete(FilesRequest $request): array
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
}
