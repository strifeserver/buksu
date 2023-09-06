<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;
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
        $JulS = Carbon::create(2023, 7, 16);
        $JulE = Carbon::create(2023, 7, 31);

        return [
            'ordered_on' => $this->faker->dateTimeBetween($JulS, $JulE),
            'seller_prospect_date_todeliver' =>  $this->faker->dateTimeBetween($JulS, $JulE),
            'date_delivered' =>null,
            'price_of_goods' =>100,
            'price_payed' =>null,
            'payed_on' => null,
            'buyers_name' => $this->faker->randomElement(\App\Models\User::pluck('id')->toArray()),
            'seller' => $this->faker->randomElement(\App\Models\User::pluck('id')->toArray()),
        ];
    }
}
