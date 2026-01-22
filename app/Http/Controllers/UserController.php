<?php

namespace App\Http\Controllers;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class UserController extends Controller
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Store a newly created user.
     */
    public function store(Request $request)
    {
        $input = $request->all();

        Validator::make($input, [
            ...$this->profileRules(),
            'password' => $this->passwordRules(),
            'cpf' => ['required', 'string', 'max:14'],
            'role' => ['required', 'string', 'in:Administrador,Moderador,Leitor'],
        ])->validate();

        User::create([
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
            'role' => $input['role'],
            'cpf' => $input['cpf'],
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Update the specified user.
     */
    public function update(Request $request, User $user)
    {
        $input = $request->all();

        $rules = [
            ...$this->profileRules($user->id),
            'cpf' => ['required', 'string', 'max:14'],
            'role' => ['required', 'string', 'in:Administrador,Moderador,Leitor'],
        ];

        // Password is optional when updating
        if (!empty($input['password'])) {
            $rules['password'] = $this->passwordRules();
        }

        Validator::make($input, $rules)->validate();

        $user->fill([
            'name' => $input['name'],
            'email' => $input['email'],
            'role' => $input['role'],
            'cpf' => $input['cpf'],
        ]);

        // Only update password if provided
        if (!empty($input['password'])) {
            $user->password = $input['password'];
        }

        $user->save();

        return redirect()->route('dashboard');
    }

    /**
     * Remove the specified user.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('dashboard');
    }
}
