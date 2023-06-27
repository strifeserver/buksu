<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Faker\Factory as Faker;


class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $sellerIds = DB::table('users')->pluck('id');

        for ($i = 0; $i < 50; $i++) {
            $sellerId = $faker->randomElement($sellerIds);

            DB::table('products')->insert([
                'product_name' => $faker->word,
                'variety' => $faker->word,
                'kilograms' => $faker->randomFloat(2, 1, 100),
                'planted_date' => $faker->date,
                'prospect_harvest_date' => $faker->optional()->date,
                'product_location' => $faker->address,
                'is_verified' => $faker->randomElement([0, 1]),
                'product_picture' => $faker->imageUrl(640, 480, 'products', true),
                'product_seller' => $sellerId,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
