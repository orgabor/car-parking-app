<?php

namespace App\Models;

use App\Models\Parking;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vehicle extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [ 'user_id', 'plate_number' ];

    protected static function booted()
    {
        static::addGlobalScope('user', function (Builder $builder) {
            $builder->where('user_id', auth()->id());
        });
    }

     public function parkings()
    {
        return $this->hasMany(Parking::class);
    }


}
