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
        'price_per_kilo',
        'price_of_goods',
        'kg_purchased',
        'transaction_id',
        'product_id',

    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'transaction_id');
    }

    public function productOrdered()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    // public function farm()
    // {
    //     return $this->belongsTo(Farm::class, 'from_farm');
    // }

}
