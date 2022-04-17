<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Hash;

/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @method static LengthAwarePaginator paginate(int $perPage = 15, array $columns = ['*'], string $pageName = 'page', int|null $page = null)
 */
class User extends Authenticatable
{
    use HasFactory, SoftDeletes;

    /**
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    protected function password(): Attribute {
        return Attribute::make(
            get: fn ($value) => $value,
            set: fn ($value) => Hash::make($value)
        );
    }
}
