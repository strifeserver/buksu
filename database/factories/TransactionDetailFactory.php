<?php

namespace Database\Factories;

use App\Models\TransactionDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionDetail>
 */
class TransactionDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = TransactionDetail::class;

    public function definition()
    {
        return [
            'product_name' => $this->faker->word,
            'variety' => $this->faker->word,
            'planted_date' => $this->faker->date,
            'harvested_date' => $this->faker->optional()->date,
            'total_price' => $this->faker->randomFloat(2, 0, 1000),
            'kg_purchased' => $this->faker->optional()->randomFloat(2, 0, 1000),
            'transaction_id' => $this->faker->randomElement(\App\Models\Transaction::pluck('id')->toArray()),
        ];
    }
}
