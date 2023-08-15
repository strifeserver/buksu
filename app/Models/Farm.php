<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Farm extends Model
{
    use HasFactory;

    protected $fillable = [
        'farm_name',
        'farm_location',
        'farm_hectares',
        'longitude',
        'latitude',
        'farm_info',
        'is_verified',
        'farm_pictures',
        'farm_owner',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'farm_owner');
    }

    public function products()
    {
        return $this->hasMany(Product::class, 'farm_belonged');
    }
}
