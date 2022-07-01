<?php

namespace App\Models;

use App\Enums\FileTypeEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $name
 * @property string $image
 * @property int $order
 */
class Category extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'image',
        'order',
        'user_created_id',
        'user_updated_id',
        'user_deleted_id'
    ];

    protected $appends = [
        'image_src'
    ];

    public function imageSrc(): Attribute {
        $src =  asset('images/empty.png');

        if (!empty($this->image)) {
            $filename = \basename($this->image);
            $src = route(
                'files.view',
                [
                    'folder' => 'images',
                    'filename' => $filename,
                    'type' => FileTypeEnum::getKey(FileTypeEnum::IMAGE)
                ]
            );
        }

        return Attribute::make(
            get: fn () => $src
        );
    }
}
