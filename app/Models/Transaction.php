<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'ordered_on',
        'payed_on',
        'buyers_prospect_date_toget',
        'seller_prospect_date_todeliver',
        'agreed_date_of_exchange',
        'price_payed',
        'buyers_name',
        'from_farm'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'buyers_name');
    }

    public function farm()
    {
        return $this->belongsTo(Farm::class, 'from_farm');
    }

    public function TransactionDetail()
    {
        return $this->hasMany(TransactionDetail::class, 'transaction_id');
    }


}
