<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'ordered_on',
        'seller_prospect_date_todeliver',
        'date_delivered',
        'price_of_goods',
        'price_payed',
        'payed_on',
        'buyers_name',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'buyers_name');
    }

    public function TransactionDetail()
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id');
    }

}
