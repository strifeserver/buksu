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
}
