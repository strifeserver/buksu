<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderProduct extends Model
{
    use HasFactory;
    protected $table = 'transaction_details';
    protected $fillable = [
        'product_name',
        'variety',
        'planted_date',
        'harvested_date',
        'price_per_kilo',
        'price_of_goods',
        'kg_purchased',
        'transaction_id',
        'product_id',

    ];
}
