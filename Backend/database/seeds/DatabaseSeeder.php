<?php

use App\Book;
use App\User;
use App\Category;
use App\Expense;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $faker = \Faker\Factory::create();
        for ($i = 0; $i < 20; $i++) {
            Category::create([
                'name' => $faker->name,
            ]);
        }
        //User::truncate();
        User::create([
            'name' => 'Ali',
            'email' => 'talaat_naji@hotmail.com',
            'password' => Hash::make('1234qwer'),
        ]);
        User::create([
            'name' => 'rayan',
            'email' => 'rayan_naji@gmail.com',
            'password' => Hash::make('1234qwer'),
        ]);
    }
}
