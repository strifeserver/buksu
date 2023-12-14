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


    public function getUpdatedAtAttribute($value)
    {
        return date('Y-m-d h:i:s', strtotime($value));
    }
    public function getCreatedAtAttribute($value)
    {
        $created_date = date('Y-m-d h:i:s', strtotime($value));

        return $created_date;
    }
}
