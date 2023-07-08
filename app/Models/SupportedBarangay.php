<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupportedBarangay extends Model
{
    use HasFactory;
    protected $fillable = ([
        'supported_barangay',
    ]);
}
