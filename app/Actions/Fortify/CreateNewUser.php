<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
public function create(array $input): User
{
    Validator::make($input, [
        ...$this->profileRules(),

        'cpf' => [
            'required',
            'string',
            'size:11',
            'digits:11',
            'unique:users,cpf',
        ],

        'role' => [
            'required',
            'string',
            'in:Administrador,Moderador,Leitor',
        ],

        'password' => $this->passwordRules(),
        'password_confirmation' => ['required'],
    ])->validate();

    $user = User::create([
        'name'     => $input['name'],
        'email'    => $input['email'],
        'cpf'      => $input['cpf'],
        'role'     => $input['role'],
        'password' => Hash::make($input['password']),   // ← ESSA LINHA É OBRIGATÓRIA!
    ]);

    // Opcional: loga o usuário automaticamente após registro (padrão do Fortify)
    // auth()->login($user);

    return $user;
}
}
