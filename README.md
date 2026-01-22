# TesteDevFullStack

Sistema de gerenciamento de usuários desenvolvido com Laravel (backend) e React (frontend), utilizando Inertia.js para integração entre as tecnologias e SQLite como banco de dados.

## 📋 Índice

- [Inicialização do Projeto](#inicialização-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Arquitetura MVC](#arquitetura-mvc)
- [Sistema de Permissões](#sistema-de-permissões)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Principais Conceitos](#principais-conceitos)

## 🚀 Inicialização do Projeto

### Pré-requisitos

- PHP 8.5 ou superior
- Composer
- Node.js 18+ e npm
- SQLite

### Passos para Inicialização

1. **Clone o repositório** (se aplicável) ou navegue até o diretório do projeto

2. **Instale as dependências do PHP:**
   ```bash
   composer install
   ```

3. **Instale as dependências do Node.js:**
   ```bash
   npm install
   ```

4. **Configure o ambiente:**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Execute as migrações:**
   ```bash
   php artisan migrate
   ```

6. **Compile os assets do frontend:**
   ```bash
   npm run build
   ```
   
   Ou para desenvolvimento com hot-reload:
   ```bash
   npm run dev
   ```

7. **Inicie o servidor:**
   ```bash
   php artisan serve
   ```

8. **Acesse a aplicação:**
   - Abra seu navegador em `http://localhost:8000`
   - Faça login com suas credenciais

## 🛠 Tecnologias Utilizadas

### Backend
- **Laravel 12**: Framework PHP moderno e robusto
- **Laravel Fortify**: Autenticação e registro de usuários
- **SQLite**: Banco de dados leve e portátil
- **Inertia.js**: Integração seamless entre Laravel e React

### Frontend
- **React 19**: Biblioteca JavaScript para interfaces de usuário
- **TypeScript**: Tipagem estática para JavaScript
- **Tailwind CSS**: Framework CSS utility-first
- **Radix UI**: Componentes acessíveis e customizáveis
- **Inertia.js React**: Adaptador React para Inertia.js

## 🏗 Arquitetura MVC

Este projeto segue o padrão de arquitetura **MVC (Model-View-Controller)**, que separa a aplicação em três camadas principais:

### Model (Modelo)
Representa os dados e a lógica de negócio. No Laravel, os Models ficam em `app/Models/`:
- **User.php**: Model que representa a entidade Usuário, contendo regras de validação, relacionamentos e métodos de acesso aos dados

### View (Visão)
Representa a apresentação dos dados ao usuário. Com Inertia.js:
- **Componentes React**: Localizados em `resources/js/components/` e `resources/js/pages/`
- **Templates Blade**: Base template em `resources/views/app.blade.php`
- Os componentes React são renderizados como views através do Inertia.js

### Controller (Controlador)
Gerencia as requisições HTTP e coordena entre Model e View. No Laravel:
- **UserController.php**: Controla as operações CRUD de usuários (Create, Read, Update, Delete)
- Recebe requisições, valida dados, interage com Models e retorna respostas Inertia

### Fluxo MVC no Projeto

1. **Requisição HTTP** → Rota (`routes/web.php`)
2. **Rota** → Controller (`app/Http/Controllers/UserController.php`)
3. **Controller** → Model (`app/Models/User.php`)
4. **Model** → Banco de Dados (SQLite)
5. **Controller** → View (Componente React via Inertia)
6. **View** → Resposta HTML renderizada no navegador

## 🔐 Sistema de Permissões

O sistema implementa três níveis de permissão hierárquicos:

### Administrador (Nível 1)
- ✅ Visualizar usuários
- ✅ Cadastrar novos usuários
- ✅ Editar outros usuários
- ✅ Excluir usuários

### Moderador (Nível 2)
- ✅ Visualizar usuários
- ✅ Editar outros usuários
- ❌ Não pode cadastrar usuários
- ❌ Não pode excluir usuários

### Leitor (Nível 3)
- ✅ Visualizar usuários
- ❌ Não pode cadastrar usuários
- ❌ Não pode editar usuários
- ❌ Não pode excluir usuários

### Regras Especiais

- **Edição do próprio perfil**: Usuários não podem editar seus próprios dados (nome, email, CPF, role) através do dashboard. Apenas a senha pode ser alterada através da página de configurações.
- **Modal de Permissão Negada**: Quando um usuário tenta realizar uma ação sem permissão, um modal informativo é exibido explicando a restrição.

## 📁 Estrutura do Projeto

```
prova/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── UserController.php      # Controlador de usuários
│   ├── Models/
│   │   └── User.php                    # Model de usuário
│   └── Concerns/
│       ├── PasswordValidationRules.php # Regras de validação de senha
│       └── ProfileValidationRules.php  # Regras de validação de perfil
├── database/
│   ├── migrations/                     # Migrações do banco de dados
│   └── database.sqlite                 # Banco de dados SQLite
├── resources/
│   ├── js/
│   │   ├── components/                 # Componentes React reutilizáveis
│   │   │   ├── user-modal.tsx          # Modal de criação/edição
│   │   │   ├── delete-user-modal.tsx  # Modal de confirmação de exclusão
│   │   │   ├── permission-denied-modal.tsx # Modal de permissão negada
│   │   │   ├── user-list.tsx          # Lista de usuários
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── dashboard.tsx           # Página principal
│   │   │   └── auth/
│   │   │       └── login.tsx          # Página de login
│   │   ├── lib/
│   │   │   └── permissions.ts        # Lógica de permissões
│   │   └── types/
│   │       └── user.ts                # Tipos TypeScript
│   └── views/
│       └── app.blade.php              # Template base
├── routes/
│   └── web.php                        # Rotas da aplicação
└── README.md                          # Este arquivo
```

## 💡 Principais Conceitos

### 1. Containers (Docker)

**Vantagens de trabalhar com ambientes de containers:**

- **Isolamento**: Cada aplicação roda em seu próprio ambiente isolado, evitando conflitos de dependências
- **Portabilidade**: A aplicação funciona da mesma forma em qualquer sistema operacional que suporte containers
- **Consistência**: Garante que desenvolvimento, teste e produção tenham ambientes idênticos
- **Escalabilidade**: Facilita a escalabilidade horizontal, criando múltiplas instâncias rapidamente
- **Versionamento**: Permite versionar o ambiente completo junto com o código
- **Recursos**: Uso eficiente de recursos do sistema através de compartilhamento do kernel do host

### 2. Git vs GitHub

**Git:**
- Sistema de controle de versão distribuído instalado localmente
- Ferramenta de linha de comando para rastrear mudanças no código
- Funciona completamente offline
- Gerencia histórico de commits, branches e merges localmente

**GitHub:**
- Plataforma web baseada em Git
- Serviço de hospedagem de repositórios Git na nuvem
- Oferece recursos adicionais: pull requests, issues, wikis, GitHub Actions
- Facilita colaboração entre desenvolvedores
- Permite backup remoto do código

**Resumo**: Git é a ferramenta, GitHub é o serviço que hospeda repositórios Git na web.

### 3. Componentes Reutilizáveis

O projeto utiliza componentes React reutilizáveis seguindo boas práticas:

- **Input**: Componente de input reutilizável (`resources/js/components/ui/input.tsx`)
- **Button**: Componente de botão com variantes (`resources/js/components/ui/button.tsx`)
- **UserModal**: Modal reutilizável para criar/editar usuários
- **Toast**: Sistema de notificações reutilizável

Cada componente é isolado, testável e pode ser usado em múltiplos contextos.

### 4. Fluxo de Autenticação

O sistema utiliza Laravel Fortify para autenticação:

1. Usuário acessa a página de login
2. Credenciais são validadas no backend
3. Sessão é criada e mantida pelo Laravel
4. Usuário é redirecionado para o dashboard
5. Middleware `auth` protege rotas que requerem autenticação

### 5. Integração Laravel + React

O projeto utiliza **Inertia.js** para integrar Laravel e React:

- **Sem API REST**: Não precisa criar endpoints JSON separados
- **SPA Nativo**: Aplicação funciona como Single Page Application
- **Compartilhamento de Dados**: Laravel passa props diretamente para componentes React
- **Navegação**: Usa rotas Laravel tradicionais com navegação SPA

## 🎯 Funcionalidades Implementadas

- ✅ Sistema de autenticação completo
- ✅ CRUD de usuários com validação
- ✅ Sistema de permissões baseado em roles
- ✅ Busca e filtro de usuários
- ✅ Notificações toast para feedback
- ✅ Modais de confirmação para ações críticas
- ✅ Validação de formulários no frontend e backend
- ✅ Interface responsiva e moderna

## 📝 Notas Adicionais

- O banco de dados SQLite é criado automaticamente na primeira execução das migrações
- As senhas são hasheadas automaticamente pelo Laravel usando bcrypt
- O sistema de notificações aparece no canto inferior direito da tela
- Componentes seguem padrões de acessibilidade (ARIA labels, keyboard navigation)

## 👨‍💻 Desenvolvimento

Para desenvolvimento ativo:

```bash
# Terminal 1: Servidor Laravel
php artisan serve

# Terminal 2: Build do frontend com hot-reload
npm run dev
```

Isso permite que mudanças no código React sejam refletidas automaticamente no navegador.

---

Desenvolvido como parte de um teste técnico para vaga de Desenvolvedor Full Stack.
