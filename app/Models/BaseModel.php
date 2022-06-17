<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $user_created_id
 * @property int $user_updated_id
 * @property int $user_deleted_id
 */
class BaseModel extends Model
{
    protected $fillable = [
        'name',
        'order',
        'user_created_id',
        'user_updated_id',
        'user_deleted_id'
    ];

    /**
     * Fill the model with an array of attributes.
     *
     * @param  array  $attributes
     * @return $this
     *
     * @throws \Illuminate\Database\Eloquent\MassAssignmentException
     */
    public function fill(array $attributes)
    {
        if ($this->exists) {
            $attributes['user_updated_id'] = auth()->user()?->id;
        } else {
            $attributes['user_created_id'] = auth()->user()?->id;
        }

        return parent::fill($attributes);
    }

    
    /**
     * Delete the model from the database.
     *
     * @return bool|null
     *
     * @throws \LogicException
     */
    public function delete()
    {
        $this->attributes['user_deleted_id'] = auth()->user()->id;
        $isSaved = $this->save();

        if (!$isSaved) {
            return false;
        }

        return parent::delete();
    }
}
