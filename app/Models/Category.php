<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * @property int $id
 * @property string $name
 * @property int $order
 * @property int $user_created_id
 * @property int $user_updated_id
 * @property int $user_deleted_id
 * @method static LengthAwarePaginator paginate(int $perPage = 15, array $columns = ['*'], string $pageName = 'page', int|null $page = null)
 * @method static Category find(int|string $id, array $columns = ['*'])
 * @method static int max()
 */
class Category extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'order',
        'user_created_id',
        'user_updated_id',
        'user_deleted_id'
    ];
}
