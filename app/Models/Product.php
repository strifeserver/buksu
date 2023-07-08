<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'variety',
        'planted_date',
        'prospect_harvest_in_kg',
        'prospect_harvest_date',
        'actual_harvested_in_kg',
        'harvested_date',
        'product_location',
        'is_verified',
        'price',
        'product_picture',
        'farm_belonged',
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class, 'farm_belonged');
    }

    public function transactionDetails()
    {
        return $this->hasMany(TransactionDetail::class, 'product_id');
    }
}
