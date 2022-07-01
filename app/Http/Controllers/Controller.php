<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Admin\Dtos\ActionResultDto;
use App\Http\Controllers\Admin\Dtos\StoreDataDto;
use App\Services\FileService\FileService;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected FileService $fileService;

    protected function getModel($data): ?Model {
        throw new Exception('Model was not implemented.');
    }

    protected function manageDataWithImage(array $data, string $fieldName, string $folder): array {
        if (null == $this->fileService || empty($data[$fieldName])) {
            return $data;
        }

        $image = $this->fileService->move($data[$fieldName], $folder);

        if (!empty($image)) {
            $data[$fieldName] = $image;
        }

        return $data;
    }

    protected function storeData(StoreDataDto $dto): ActionResultDto {
        $result = new ActionResultDto();
        $model = $this->getModel($dto->data);

        if (null == $model) {
            $result->statusCode = 404;
            $result->message = $dto->notFoundMessage;
            $result->hasErrors = true;

            return $result;
        }

        $model->fill($dto->data);
        $isSaved = $model->save();

        if (!$isSaved) {
            $result->statusCode = 404;
            $result->message = $dto->errorMessage;
            $result->hasErrors = true;

            return $result;
        }

        $result->statusCode = 200;
        $result->message = $dto->successMessage;

        return $result;
    }
}
