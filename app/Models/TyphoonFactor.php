<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TyphoonFactor extends Model
{
    use HasFactory;

    protected $fillable = [
        'typhoon_name',
        'is_low_pressure_area',
        'typhoon_lpa_date_from',
        'typhoon_lpa_date_until',
        'signal_number',
        'affected_areas',
        'harvested_date',
    ];
}
