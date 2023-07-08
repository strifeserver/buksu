<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportedProducts extends Model
{
    use HasFactory;

    protected $fillable = ([
        'supported_product',
    ]);
}
