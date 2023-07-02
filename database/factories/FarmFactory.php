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
            'google_maps_pin' => $this->faker->randomNumber(8),
            'prospect_harvest_date' => $this->faker->optional()->date,
            'farm_info' => $this->faker->text,
            'farm_pictures' => $this->faker->imageUrl(),
            'is_verified' => $this->faker->boolean,
            'farm_owner' => $this->faker->randomElement(\App\Models\User::pluck('id')->toArray()),
        ];
    }
}
