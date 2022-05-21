<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @property int $id
 * @property string $name
 * @property string $image
 * @property string $link
 * @property int $category_id
 * @property Category $category
 * @property int $user_created_id
 * @property int $user_updated_id
 * @property int $user_deleted_id
 * @method static LengthAwarePaginator paginate(int $perPage = 15, array $columns = ['*'], string $pageName = 'page', int|null $page = null)
 * @method static Product find(int|string $id, array $columns = ['*'])
 * @method static int max()
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image',
        'link',
        'category_id',
        'user_created_id',
        'user_updated_id',
        'user_deleted_id'
    ];

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }
}
