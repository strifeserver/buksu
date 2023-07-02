<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Transaction::class;

    public function definition()
    {
        return [
            'ordered_on' => $this->faker->date,
            'payed_on' => $this->faker->optional()->date,
            'seller_prospect_date_todeliver' => $this->faker->optional()->date,
            'buyers_prospect_date_toget' => $this->faker->optional()->date,
            'agreed_date_of_exchange' => $this->faker->optional()->date,
            'price_payed' => $this->faker->randomFloat(2, 0, 1000),
            'buyers_name' => $this->faker->randomElement(\App\Models\User::pluck('id')->toArray()),
            'from_farm' => $this->faker->randomElement(\App\Models\Farm::pluck('id')->toArray()),
        ];
    }
}
