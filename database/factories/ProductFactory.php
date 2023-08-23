<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Support\Arr;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

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

        // Define the range for July 2023
    $startOfJuly2023 = Carbon::create(2023, 6, 1);
    $endOfJuly2023 = Carbon::create(2023, 6, 30);

    $startOfAug = Carbon::create(2023, 7, 1);
    $endOfAug = Carbon::create(2023, 7, 15);

    $JulS = Carbon::create(2023, 7, 16);
    $JulE = Carbon::create(2023, 7, 20);

        return [
            'product_name' => Arr::random(['Brocolli-A', 'Brocolli-B','Carrot-C', 'Cabbage-X', 'Tomato-F']),
            'product_type' => Arr::random(['Brocollis', 'Carrots', 'Cabbages', 'Tomatoes']),
            'variety' => $this->faker->word,
            'planted_date' =>  $this->faker->dateTimeBetween($startOfJuly2023, $endOfJuly2023),
            'prospect_harvest_in_kg' => $this->faker->randomFloat(2, 0, 1000),
            'prospect_harvest_date' => $this->faker->optional()->date,
            'actual_harvested_in_kg' => $this->faker->randomFloat(2, 0, 1000),
            'harvested_date' => $this->faker->dateTimeBetween($startOfAug, $endOfAug),
            'product_location' => $this->faker->address,
            'price' => 12.71,
            'product_picture' => $this->faker->imageUrl(),
            'farm_belonged' => $this->faker->randomElement(\App\Models\Farm::pluck('id')->toArray()),
        ];
    }
}
