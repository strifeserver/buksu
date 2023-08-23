<?php

namespace Database\Factories;

use App\Models\Farm;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Farm>
 */
class FarmFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Farm::class;
    public function definition()
    {
        return [
            'farm_name' => $this->faker->company,
            'farm_location' => $this->faker->address,
            'farm_hectares' => $this->faker->randomFloat(2, 0, 100),
            'longitude' => (125.029250),
            'latitude' => (8.011440),
            'farm_info' => $this->faker->text,
            'farm_pictures' => $this->faker->imageUrl(),
            'farm_owner' => $this->faker->randomElement(\App\Models\User::pluck('id')->toArray()),
        ];
    }
}
