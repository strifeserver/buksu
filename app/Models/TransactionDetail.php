<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_name',
        'variety',
        'planted_date',
        'harvested_date',
        'total_price',
        'kg_purchased',
        'transaction_id',
    ];
}
