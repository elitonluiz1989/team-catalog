<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property string $name
 * @property int $order
 */
class Category extends BaseModel
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'order',
        'user_created_id',
        'user_updated_id',
        'user_deleted_id'
    ];

    public function products(): HasMany {
        return $this->hasMany(Product::class);
    }
}
