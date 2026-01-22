<?php

use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Laravel\Fortify\Features;

test('login screen can be rendered', function () {
    $response = $this->get(route(name: 'login'));

    $response->assertOk();
});

// test('users can authenticate using the login screen', function () {
//     $user = User::factory()->create();

//     $response = $this->post(route('login.store'), [
//         'cpf'      => $user->cpf,
//         'password' => 'password',
//         'remember' => true,  // ← adicione isso!
//     ]);

//     $this->assertAuthenticated();
//     $this->assertAuthenticatedAs($user);
//     $response->assertRedirect(route('dashboard'));
// });

// test('users with two factor enabled are redirected to two factor challenge', function () {
//     if (! Features::canManageTwoFactorAuthentication()) {
//         $this->markTestSkipped('Two-factor authentication is not enabled.');
//     }

//     Features::twoFactorAuthentication([
//         'confirm' => true,
//         'confirmPassword' => true,
//     ]);

//     $user = User::factory()->create();

//     $user->forceFill([
//         'two_factor_secret' => encrypt('test-secret'),
//         'two_factor_recovery_codes' => encrypt(json_encode(['code1', 'code2'])),
//         'two_factor_confirmed_at' => now(),
//     ])->save();

//     $response = $this->post(route('login'), [
//         'cpf' => $user->cpf,
//         'password' => 'password',
//     ]);

//     $response->assertRedirect(route('two-factor.login'));
//     $response->assertSessionHas('login.id', $user->id);
//     $this->assertGuest();
// });



test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'cpf' => $user->cpf,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $this->assertGuest();
    $response->assertRedirect(route('home'));
});

