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
         \App\Models\User::factory(30)->create();

         // Seed users
        //  factory(User::class, 10)->create();

         // Seed farms
        //  factory(Farm::class, 5)->create();
         \App\Models\Farm::factory(10)->create();

         // Seed products
        //  factory(Product::class, 20)->create();
         \App\Models\Product::factory(130)->create();

         // Seed transactions
        //  factory(Transaction::class, 15)->create();
        \App\Models\Transaction::factory(20)->create();

         // Seed transaction details
        //  factory(TransactionDetail::class, 50)->create();
        \App\Models\TransactionDetail::factory(20)->create();

    }
}
