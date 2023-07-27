<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Product::class;

    public function definition()
    {
        return [
            'product_name' => $this->faker->word,
            'product_type' => Arr::random(['Brocollis', 'Carrots', 'Cabbages', 'Tomatoes']),
            'variety' => $this->faker->word,
            'planted_date' => $this->faker->date,
            'prospect_harvest_in_kg' => $this->faker->randomFloat(2, 0, 1000),
            'prospect_harvest_date' => $this->faker->optional()->date,
            'actual_harvested_in_kg' => $this->faker->randomFloat(2, 0, 1000),
            'harvested_date' => $this->faker->optional()->date,
            'product_location' => $this->faker->address,
            'price' => $this->faker->randomFloat(2, 0, 100),
            'product_picture' => $this->faker->imageUrl(),
            'farm_belonged' => $this->faker->randomElement(\App\Models\Farm::pluck('id')->toArray()),
        ];
    }
}
