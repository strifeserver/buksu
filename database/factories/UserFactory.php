<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = User::class;

    public function definition()
    {
        return [
            'name' => $this->faker->name,
            'birthday' => $this->faker->date,
            'address' => $this->faker->address,
            'mobile_number' => $this->faker->phoneNumber,
            'email' => $this->faker->unique()->safeEmail,
            'user_type' => $this->faker->randomElement([0, 1, 2]),
            'email_verified_at' => $this->faker->optional()->dateTime,
            'password' => bcrypt('password'),
            'profile_pic' => $this->faker->imageUrl(),
            'is_verified' => (0),
            'is_active' => (0),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
