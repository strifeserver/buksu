<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CropRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'barangay',
        'commodity',
       'record_date',
       'area',
        'yeild',
    ];
}
