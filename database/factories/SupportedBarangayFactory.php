<?php

namespace Database\Factories;

use App\Models\SupportedBarangay;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\SupportedBarangay>
 */
class SupportedBarangayFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = SupportedBarangay::class;


    public function definition()
    {
        static $index = 0;
        $barangays = ['Bugcaon', 'Kulasihan', 'Bantuanon', 'Babahagon', 'Poblacion', 'Balila', 'Cawayan', 'Alanib', 'Basac', 'Capitan Juan', 'Victory', 'Songco'];

        return [
            'supported_barangay' => $barangays[$index++],
        ];
    }
}
