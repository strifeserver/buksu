<?php

namespace Database\Seeders;

use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        for ($i = 0; $i < 500; $i++) {
            DB::table('users')->insert([
                'name' => $faker->name,
                'birthday' => $faker->date,
                'address' => $faker->address,
                'mobile_number' => $faker->unique()->phoneNumber,
                'email' => $faker->unique()->email,
                'user_type' => 0,
                'email_verified_at' => now(),
                'password' => Hash::make('password'),
                'profile_pic' => null,
                'is_active' => $faker->randomElement([0, 1]),
                'remember_token' => Str::random(10),
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
