# TesteDevFullStack

Sistema de gerenciamento de usuários desenvolvido com Laravel e React, utilizando Inertia.js para integração entre backend e frontend. O projeto implementa um sistema completo de autenticação e CRUD de usuários com diferentes níveis de permissão.

## Índice

- [Inicialização do Projeto](#inicialização-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura MVC](#arquitetura-mvc)
- [Estrutura de Rotas](#estrutura-de-rotas)
- [Páginas e Views](#páginas-e-views)
- [Controllers](#controllers)
- [Docker com Laravel Sail](#docker-com-laravel-sail)
- [Banco de Dados SQLite](#banco-de-dados-sqlite)
- [Sistema de Permissões](#sistema-de-permissões)
- [Credenciais de Acesso](#credenciais-de-acesso)

## Inicialização do Projeto

### Pré-requisitos

- PHP 8.2 ou superior
- Composer
- Node.js 18+ e npm
- Docker e Docker Compose (para usar Laravel Sail)

### Instalação Local

1. Clone o repositório ou navegue até o diretório do projeto

2. Instale as dependências do PHP:
   ```bash
   composer install
   ```

3. Instale as dependências do Node.js:
   ```bash
   npm install
   ```

4. Execute as migrações:
   ```bash
   php artisan migrate
   ```

   5. Semeie a tabela Users:
   ```bash
   php artisan db:seed --class=UserSeeder
   ```

6. Compile os assets do frontend e executar os servidores:
   ```bash
   composer run dev
   ```
   

8. Acesse a aplicação em `http://localhost:8000`

## Tecnologias Utilizadas

### Backend

- **Laravel 12**: Framework PHP para desenvolvimento web
- **Laravel Fortify**: Sistema de autenticação completo
- **Laravel Sail**: Ambiente Docker para desenvolvimento
- **SQLite**: Banco de dados relacional leve
- **Inertia.js**: Integração entre Laravel e React sem necessidade de API REST

### Frontend

- **React 19**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Tailwind CSS 4**: Framework CSS utility-first
- **Radix UI**: Componentes acessíveis e customizáveis
- **Vite**: Build tool e dev server moderno
- **Inertia.js React**: Adaptador React para Inertia.js

### Ferramentas de Desenvolvimento

- **Pest**: Framework de testes para PHP
- **Laravel Pint**: Code style fixer
- **ESLint**: Linter para JavaScript/TypeScript
- **Prettier**: Formatador de código

## Arquitetura MVC

O projeto segue o padrão de arquitetura MVC (Model-View-Controller), separando a aplicação em três camadas principais:

### Model (Modelo)

Os Models representam os dados e a lógica de negócio da aplicação. Eles ficam localizados em `app/Models/`:

- **User.php**: Model que representa a entidade Usuário. Contém:
  - Atributos fillable: name, email, password, role, cpf
  - Casts automáticos para password (hashed) e datas
  - Relacionamentos e métodos de acesso aos dados
  - Integração com Laravel Fortify para autenticação de dois fatores

### View (Visão)

As Views são responsáveis pela apresentação dos dados ao usuário. Com Inertia.js, as views são componentes React:

- **Componentes React**: Localizados em `resources/js/components/` e `resources/js/pages/`
- **Template Base**: `resources/views/app.blade.php` - template Blade que carrega o Inertia.js
- **Componentes Reutilizáveis**: Biblioteca de componentes UI em `resources/js/components/ui/`
- **Layouts**: Layouts compartilhados em `resources/js/layouts/`

Os componentes React são renderizados como views através do Inertia.js, permitindo que o Laravel passe dados diretamente como props para os componentes.

### Controller (Controlador)

Os Controllers gerenciam as requisições HTTP e coordenam a comunicação entre Model e View. Localizados em `app/Http/Controllers/`:

- **UserController.php**: Controla as operações CRUD de usuários
  - `store()`: Cria novos usuários
  - `update()`: Atualiza usuários existentes
  - `destroy()`: Remove usuários
- **Settings/ProfileController.php**: Gerencia o perfil do usuário autenticado
- **Settings/PasswordController.php**: Gerencia alteração de senha
- **Settings/TwoFactorAuthenticationController.php**: Gerencia autenticação de dois fatores

Os controllers recebem requisições, validam dados usando Concerns (PasswordValidationRules, ProfileValidationRules), interagem com Models e retornam respostas Inertia que renderizam componentes React.

### Fluxo MVC no Projeto

1. **Requisição HTTP** chega em uma rota definida em `routes/web.php` ou `routes/settings.php`
2. **Rota** direciona para o Controller apropriado
3. **Controller** valida os dados e interage com o Model
4. **Model** realiza operações no banco de dados SQLite
5. **Controller** retorna uma resposta Inertia com dados e o componente React a ser renderizado
6. **Inertia.js** renderiza o componente React no navegador
7. **View (React)** exibe os dados ao usuário

## Estrutura de Rotas

As rotas estão organizadas em dois arquivos principais:

### Rotas Públicas (`routes/web.php`)

- `GET /`: Redireciona para a página de login
- `GET /login`: Exibe o formulário de login
- `POST /login`: Processa o login do usuário
- `POST /logout`: Encerra a sessão do usuário

### Rotas Autenticadas (`routes/web.php`)

Todas as rotas abaixo requerem autenticação (`auth` middleware):

- `GET /dashboard`: Página principal com lista de usuários
- `POST /users`: Cria um novo usuário (UserController@store)
- `PUT /users/{user}`: Atualiza um usuário existente (UserController@update)
- `DELETE /users/{user}`: Remove um usuário (UserController@destroy)

### Rotas de Configurações (`routes/settings.php`)

- `GET /settings`: Redireciona para `/settings/profile`
- `GET /settings/profile`: Exibe formulário de edição de perfil
- `PATCH /settings/profile`: Atualiza o perfil do usuário
- `DELETE /settings/profile`: Remove a conta do usuário
- `GET /settings/password`: Exibe formulário de alteração de senha
- `PUT /settings/password`: Atualiza a senha do usuário
- `GET /settings/appearance`: Página de configurações de aparência
- `GET /settings/two-factor`: Página de autenticação de dois fatores

## Páginas e Views

As páginas são componentes React localizados em `resources/js/pages/`:

### Páginas de Autenticação (`resources/js/pages/auth/`)

- **login.tsx**: Página de login do sistema
- **register.tsx**: Página de registro (se habilitado no Fortify)
- **forgot-password.tsx**: Recuperação de senha
- **reset-password.tsx**: Redefinição de senha
- **verify-email.tsx**: Verificação de email
- **confirm-password.tsx**: Confirmação de senha para ações sensíveis
- **two-factor-challenge.tsx**: Desafio de autenticação de dois fatores

### Páginas Principais

- **dashboard.tsx**: Página principal do sistema, exibe lista de usuários com funcionalidades de busca, criação, edição e exclusão
- **welcome.tsx**: Página de boas-vindas (se aplicável)

### Páginas de Configurações (`resources/js/pages/settings/`)

- **profile.tsx**: Edição de perfil do usuário autenticado
- **password.tsx**: Alteração de senha
- **appearance.tsx**: Configurações de aparência do sistema
- **two-factor.tsx**: Configuração de autenticação de dois fatores

### Componentes Principais

Os componentes reutilizáveis estão em `resources/js/components/`:

- **user-modal.tsx**: Modal para criar/editar usuários
- **delete-user-modal.tsx**: Modal de confirmação para exclusão
- **permission-denied-modal.tsx**: Modal exibido quando usuário não tem permissão
- **user-list.tsx**: Lista de usuários com ações
- **user-list-item.tsx**: Item individual da lista
- **user-search-bar.tsx**: Barra de busca e filtro
- **user-role-card.tsx**: Card exibindo informações da role do usuário atual
- **ui/**: Biblioteca de componentes UI base (Button, Input, Dialog, Toast, etc.)

## Controllers

### UserController

Localizado em `app/Http/Controllers/UserController.php`, gerencia todas as operações relacionadas a usuários:

- **store()**: Valida e cria novos usuários. Valida nome, email, CPF, senha e role
- **update()**: Atualiza dados de usuários existentes. Senha é opcional na atualização
- **destroy()**: Remove usuários do sistema

Utiliza os Concerns `PasswordValidationRules` e `ProfileValidationRules` para validação consistente.

### Settings Controllers

Localizados em `app/Http/Controllers/Settings/`:

- **ProfileController**: Gerencia atualização e exclusão de perfil
- **PasswordController**: Gerencia alteração de senha com throttling (6 tentativas por minuto)
- **TwoFactorAuthenticationController**: Gerencia configuração de autenticação de dois fatores

## Docker com Laravel Sail

O projeto utiliza Laravel Sail para desenvolvimento em containers Docker. O arquivo `compose.yaml` define o ambiente de desenvolvimento.

### Configuração do Docker

O arquivo `compose.yaml` configura:

- **Serviço laravel.test**: Container principal da aplicação
- **Porta 8000**: Mapeada para porta 80 do container (acesso via `http://localhost:8000`)
- **Porta Vite**: Configurável via variável `VITE_PORT` (padrão 5173)
- **Volumes**: Código do projeto montado em `/var/www/html`
- **Comando**: Executa `composer dev` que inicia servidor Laravel, queue worker e Vite simultaneamente

### Uso do Laravel Sail

Para iniciar o ambiente Docker:

```bash
./vendor/bin/sail up
```

Ou se estiver usando alias:

```bash
sail up
```

O comando `composer dev` configurado no `composer.json` utiliza `concurrently` para executar três processos simultaneamente:
- Servidor Laravel (porta 80)
- Queue worker do Laravel
- Servidor de desenvolvimento Vite (hot-reload)

### Vantagens do Docker

- Isolamento de dependências
- Ambiente consistente entre desenvolvedores
- Facilita onboarding de novos desenvolvedores
- Não polui o ambiente local com dependências do projeto

## Banco de Dados SQLite

O projeto utiliza SQLite como banco de dados padrão, configurado em `config/database.php`.

### Configuração

- **Driver**: sqlite
- **Arquivo**: `database/database.sqlite` (criado automaticamente na primeira migração)
- **Vantagens**: Não requer servidor de banco de dados separado, ideal para desenvolvimento e testes

### Migrações

As migrações estão em `database/migrations/` e definem a estrutura do banco:

- Tabela `users`: Armazena dados dos usuários (id, name, email, password, role, cpf, timestamps)
- Tabelas do Laravel Fortify: Para funcionalidades de autenticação
- Tabelas de sessão e cache: Para gerenciamento de estado

### Seeders

O `DatabaseSeeder` em `database/seeders/` pode ser usado para popular o banco com dados de teste.

## Sistema de Permissões

O sistema implementa três níveis de permissão hierárquicos baseados no campo `role` do modelo User:

### Administrador (Nível 1)

- Visualizar lista de usuários
- Cadastrar novos usuários
- Editar outros usuários
- Excluir usuários
- Acesso completo ao sistema

### Moderador (Nível 2)

- Visualizar lista de usuários
- Editar outros usuários
- Não pode cadastrar novos usuários
- Não pode excluir usuários

### Leitor (Nível 3)

- Visualizar lista de usuários
- Não pode cadastrar usuários
- Não pode editar usuários
- Não pode excluir usuários

### Regras Especiais

- **Edição do próprio perfil**: Usuários não podem editar seus próprios dados (nome, email, CPF, role) através do dashboard. Apenas a senha pode ser alterada através da página de configurações (`/settings/password`)
- **Modal de Permissão Negada**: Quando um usuário tenta realizar uma ação sem permissão, um modal informativo é exibido explicando a restrição
- **Proteção de último administrador**: O sistema impede a exclusão do último administrador, garantindo que sempre haja pelo menos um usuário com acesso completo

A lógica de permissões está implementada tanto no frontend (`resources/js/lib/permissions.ts`) quanto no backend através de validações nos controllers.

## Credenciais de Acesso

O sistema possui três usuários de exemplo pré-configurados para testes:

### Administrador
- **CPF**: 11111111111
- **Senha**: senha_admin
- **Permissões**: Acesso completo ao sistema

### Moderador
- **CPF**: 22222222222
- **Senha**: senha_mod
- **Permissões**: Pode visualizar e editar usuários, mas não pode criar ou excluir

### Leitor
- **CPF**: 33333333333
- **Senha**: senha_leitor
- **Permissões**: Apenas visualização de usuários

## Estrutura do Projeto

```
testeDevFullStack/
├── app/
│   ├── Actions/Fortify/          # Ações customizadas do Fortify
│   ├── Concerns/                  # Traits reutilizáveis
│   │   ├── PasswordValidationRules.php
│   │   └── ProfileValidationRules.php
│   ├── Http/
│   │   ├── Controllers/           # Controladores da aplicação
│   │   │   ├── UserController.php
│   │   │   └── Settings/
│   │   ├── Middleware/            # Middlewares customizados
│   │   └── Requests/              # Form Requests para validação
│   ├── Models/
│   │   └── User.php               # Model de usuário
│   └── Providers/
│       └── FortifyServiceProvider.php
├── database/
│   ├── migrations/                # Migrações do banco de dados
│   ├── seeders/                   # Seeders para popular dados
│   └── database.sqlite           # Banco de dados SQLite
├── resources/
│   ├── js/
│   │   ├── components/            # Componentes React reutilizáveis
│   │   │   ├── ui/                # Componentes base (Button, Input, etc.)
│   │   │   ├── user-modal.tsx
│   │   │   ├── user-list.tsx
│   │   │   └── ...
│   │   ├── pages/                 # Páginas da aplicação
│   │   │   ├── auth/
│   │   │   ├── settings/
│   │   │   ├── dashboard.tsx
│   │   │   └── welcome.tsx
│   │   ├── layouts/               # Layouts compartilhados
│   │   ├── lib/                   # Utilitários e helpers
│   │   │   └── permissions.ts
│   │   ├── types/                 # Tipos TypeScript
│   │   └── app.tsx                # Ponto de entrada React
│   └── views/
│       └── app.blade.php          # Template base Blade
├── routes/
│   ├── web.php                    # Rotas principais
│   ├── settings.php               # Rotas de configurações
│   └── console.php                # Comandos Artisan
├── compose.yaml                   # Configuração Docker/Sail
├── composer.json                  # Dependências PHP
├── package.json                   # Dependências Node.js
└── README.md                      # Este arquivo
```

## Desenvolvimento

Para desenvolvimento ativo com hot-reload:

```bash
composer run dev 
```

Ou usando Docker Sail:

```bash
./vendor/bin/sail up
```

O comando `composer dev` já inicia todos os serviços necessários automaticamente quando usando Sail.

## Funcionalidades Implementadas

- Sistema de autenticação completo com Laravel Fortify
- CRUD de usuários com validação em frontend e backend
- Sistema de permissões baseado em roles (Administrador, Moderador, Leitor)
- Busca e filtro de usuários em tempo real
- Notificações toast para feedback de ações
- Modais de confirmação para ações críticas (exclusão, permissão negada)
- Validação de formulários no frontend e backend
- Interface responsiva e moderna com Tailwind CSS
- Autenticação de dois fatores (configurável)
- Gerenciamento de perfil e senha
- Layout com sidebar e navegação

## Notas Técnicas

- O banco de dados SQLite é criado automaticamente na primeira execução das migrações
- As senhas são hasheadas automaticamente pelo Laravel usando bcrypt
- O sistema de notificações toast aparece no canto inferior direito da tela
- Componentes seguem padrões de acessibilidade (ARIA labels, navegação por teclado)
- O projeto utiliza TypeScript para type safety no frontend
- Validações são implementadas usando Concerns para reutilização de código

---

Desenvolvido como parte de um teste técnico para vaga de Desenvolvedor Full Stack.