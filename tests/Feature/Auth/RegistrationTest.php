<?php

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post('/register', [
        'name'                  => 'Novo Usuário Teste',
        'email'                 => 'novo@exemplo.com',
        'cpf'                   => '98765432100',
        'role'                  => 'Leitor',
        'password'              => 'senha123',
        'password_confirmation' => 'senha123',
    ]);

    $this->assertAuthenticated();                        // deve passar agora
    $response->assertRedirect(route('dashboard'));

    $this->assertDatabaseHas('users', [
        'email' => 'novo@exemplo.com',
        'cpf'   => '98765432100',
        'role'  => 'Leitor',
    ]);
});