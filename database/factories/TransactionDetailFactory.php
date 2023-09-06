<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Support\Arr;
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
        $JulS = Carbon::create(2023, 7, 1);
        $JulE = Carbon::create(2023, 7, 31);
        return [
            'product_name' => Arr::random(['Brocolli-A', 'Brocolli-B','Carrot-C', 'Cabbage-X', 'Tomato-F']),
            'variety' => $this->faker->word,
            'planted_date' => $this->faker->date,
            'harvested_date' => $this->faker->dateTimeBetween($JulS, $JulE),
            'kg_purchased' => $this->faker->randomFloat(2, 0, 1000),
            'price_per_kilo' => 12.71,
            'transaction_id' => $this->faker->randomElement(\App\Models\Transaction::pluck('id')->toArray()),
            'product_id' => $this->faker->randomElement(\App\Models\Product::pluck('id')->toArray()),

        ];
    }
}
