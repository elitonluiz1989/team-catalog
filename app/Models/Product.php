<?php

namespace App\Models;

use App\Enums\FileTypeEnum;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $name
 * @property string $image
 * @property string $link
 * @property int $category_id
 * @property Category $category
 * @property string $image_src
 */
class Product extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'image',
        'link',
        'category_id',
        'user_created_id',
        'user_updated_id',
        'user_deleted_id'
    ];

    protected $appends = [
        'image_src'
    ];

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }

    public function imageSrc(): Attribute {
        if (empty($this->image)) {
            return Attribute::make(
                get: fn () => asset('images/empty.png')
            );
        }
        
        $path = explode('/', $this->image);
        $filename = $path[count($path) - 1];

        return Attribute::make(
            get: fn () => route('files.view', ['folder' => 'images', 'filename' => $filename, 'type' => FileTypeEnum::getKey(FileTypeEnum::IMAGE) ])
        );
    }
}
