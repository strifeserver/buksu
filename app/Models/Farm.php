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
        'google_maps_pin',
        'prospect_harvest_date',
        'farm_info',
        'farm_pictures',
        'is_verified',
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
