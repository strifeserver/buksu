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
        'price',
        'volume',
        'planted_date',
        'prospect_harvest_date',
        'product_location',
        'is_verified',
        'product_picture',
        'product_seller',
    ];
}
