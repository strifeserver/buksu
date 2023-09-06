<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        \App\Models\SupportedBarangay::factory(12)->create();

        \App\Models\SupportedProduct::factory(4)->create();

        \App\Models\User::factory(2)->create();

        \App\Models\Farm::factory(1)->create();

        \App\Models\Product::factory(5)->create();

        \App\Models\Transaction::factory(1)->create();

        \App\Models\TransactionDetail::factory(2)->create();

    }
}
