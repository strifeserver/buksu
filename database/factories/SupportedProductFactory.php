<?php

namespace Database\Factories;

use App\Models\SupportedProduct;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SupportedProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    protected $model = SupportedProduct::class;


    public function definition()
    {
        static $index = 0;
        $supportedProducts = ['Brocollis', 'Carrots', 'Cabbages', 'Tomatoes'];

        return [
            'supported_product' => $supportedProducts[$index++],
        ];
    }
}
