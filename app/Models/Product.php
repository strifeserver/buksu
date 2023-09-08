<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'product_type',
        'variety',
        'planted_date',
        'prospect_harvest_in_kg',
        'prospect_harvest_date',
        'actual_harvested_in_kg',
        'actual_sold_kg',
        'harvested_date',
        'product_location',
        'price',
        'product_picture',
        'farm_belonged',
        'is_approved',
    ];

    public function farm()
    {
        return $this->belongsTo(Farm::class, 'farm_belonged');
    }



    public function transactionsPerProduct()
    {
        return $this->hasMany(TransactionDetail::class, 'product_id');
    }
}
