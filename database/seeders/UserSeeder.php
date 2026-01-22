<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Optional: Clear existing users to avoid "Duplicate ID" errors
        // User::truncate();

        $users = [
            [
                'id' => 1,
                'name' => 'Admin Teste',
                'email' => 'admin@email.com',
                'cpf' => '11111111111',
                'role' => 'Administrador',
                'password' => Hash::make('senha_admin'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Moderador Teste',
                'email' => 'mod@email.com',
                'cpf' => '22222222222',
                'role' => 'Moderador',
                'password' => Hash::make('senha_mod'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Leitor Teste',
                'email' => 'leitor@email.com',
                'cpf' => '33333333333',
                'role' => 'Leitor',
                'password' => Hash::make('senha_leitor'),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            User::updateOrCreate(['id' => $user['id']], $user);
        }
    }
}