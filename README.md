# Trabalho de Conclusão - Automação de Testes Web (PGATS)

Projeto de automação de testes End-to-End (E2E) desenvolvido para a avaliação da disciplina de **Automação de Testes Web** do curso de **Pós-Graduação em Automação de Testes de Software (PGATS)** - parceria Julio de Lima Consultoria e Treinamentos & Faculdade VINCIT.

A automação cobre os casos de teste especificados na aplicação de comércio eletrônico [Automation Exercise](https://www.automationexercise.com/).

---

## 📋 Casos de Teste Implementados

Conforme exigido nas diretrizes da prova e correspondente aos **Exercícios 01 e 05 da apostila**:

| ID               | Cenário                                        | Suíte / Arquivo         | Descrição Resumida                                                                                                                                                 |
| ---------------- | ---------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Test Case 1**  | _Register User_                                | `01_auth.cy.js`         | Cadastro completo de novo usuário, verificação de criação, login ativo e exclusão de conta.                                                                        |
| **Test Case 2**  | _Login User with correct email and password_   | `01_auth.cy.js`         | Criação prévia de usuário via API (Supertest), login com credenciais válidas e exclusão de conta.                                                                  |
| **Test Case 3**  | _Login User with incorrect email and password_ | `01_auth.cy.js`         | Tentativa de login com senha incorreta e validação de mensagem de erro.                                                                                            |
| **Test Case 4**  | _Logout User_                                  | `01_auth.cy.js`         | Login de usuário, validação da sessão e logout com retorno à página de login.                                                                                      |
| **Test Case 5**  | _Register User with existing email_            | `01_auth.cy.js`         | Tentativa de cadastro com email já existente e validação do alerta de duplicidade.                                                                                 |
| **Test Case 8**  | _Verify All Products and product detail page_  | `02_products.cy.js`     | Navegação até o catálogo de produtos, verificação da lista e inspeção de detalhes (nome, categoria, preço, estoque, condição, marca).                              |
| **Test Case 9**  | _Search Product_                               | `02_products.cy.js`     | Busca de produtos por termo no catálogo e validação dos resultados exibidos.                                                                                       |
| **Test Case 10** | _Verify Subscription in home page_             | `03_subscription.cy.js` | Scroll até o rodapé da página inicial, envio de email no campo de inscrição e validação de sucesso.                                                                |
| **Test Case 15** | _Place Order: Register before Checkout_        | `04_checkout.cy.js`     | Cadastro de usuário antes da compra, adição de produto ao carrinho, checkout com validação de endereço e itens, pagamento simulado com cartão e exclusão de conta. |
| **Test Case 16** | _Place Order: Login before Checkout_           | `04_checkout.cy.js`     | Login com usuário existente, adição de produto ao carrinho, checkout com revisão de endereço e pedido, pagamento com cartão e exclusão de conta.                   |

---

## 🛠️ Tecnologias e Bibliotecas Utilizadas

- **JavaScript (Node.js)**: Linguagem padrão do ecossistema.
- **Cypress (v13+)**: Framework moderno para testes E2E executados diretamente no navegador.
- **Mocha**: Estruturação de testes em BDD (`describe`, `it`, `beforeEach`).
- **Chai**: Asserções semânticas legíveis (`should`, `expect`, `assert`).
- **Supertest**: Integração de API em nível Node para criação e limpeza ágil e idempotente de usuários nos endpoints oficiais (`/api/createAccount`, `/api/deleteAccount`).
- **@faker-js/faker**: Geração dinâmica de dados realistas e únicos (nomes, endereços, cartões, emails com timestamps).
- **cypress-mochawesome-reporter**: Relatórios HTML visuais, interativos e com métricas de execução e screenshots.
- **GitHub Actions**: Integração contínua (CI) com pipeline configurada para rodar os testes e publicar relatórios como artefatos.

---

## 🏛️ Padrões de Projeto e Arquitetura

O projeto adota o padrão **Page Object Model (POM)** (conforme ensinado na apostila, páginas 47–48), separando claramente as responsabilidades:

```
prova-teste-web/
├── .github/
│   └── workflows/
│       └── e2e.yml                     # Pipeline CI no GitHub Actions
├── cypress/
│   ├── e2e/
│   │   ├── 01_auth.cy.js               # Casos de Teste 1, 2, 3, 4 e 5
│   │   ├── 02_products.cy.js           # Casos de Teste 8 e 9
│   │   ├── 03_subscription.cy.js       # Caso de Teste 10
│   │   └── 04_checkout.cy.js           # Casos de Teste 15 e 16
│   ├── fixtures/
│   │   └── paymentData.json            # Dados mock de pagamento
│   ├── support/
│   │   ├── pages/
│   │   │   ├── BasePage.js             # Elementos e ações do Header e métodos globais
│   │   │   ├── HomePage.js             # Validações da Home e Newsletter
│   │   │   ├── AuthPage.js             # Formulários de Login e Início de Cadastro
│   │   │   ├── SignupPage.js           # Formulário detalhado 'ENTER ACCOUNT INFORMATION'
│   │   │   ├── AccountStatusPage.js    # Telas de sucesso (Account Created / Deleted)
│   │   │   ├── ProductsPage.js         # Catálogo de produtos e barra de busca
│   │   │   ├── ProductDetailPage.js    # Atributos e detalhes do produto
│   │   │   ├── CartPage.js             # Itens do carrinho e prosseguir para checkout
│   │   │   ├── CheckoutPage.js         # Endereços de entrega/cobrança e comentário
│   │   │   └── PaymentPage.js          # Cartão de crédito e confirmação do pedido
│   │   ├── utils/
│   │   │   ├── dataFactory.js          # Gerador dinâmico com @faker-js/faker
│   │   │   └── apiHelper.js            # Utilitário de chamadas à API via Supertest
│   │   ├── commands.js                 # Custom Commands do Cypress
│   │   └── e2e.js                      # Configurações globais e bloqueio de anúncios
├── .gitignore
├── .prettierrc
├── cypress.config.js                   # Configurações do Cypress e tasks do Supertest
├── package.json
└── README.md
```

### 🛡️ Prevenção contra Falhas (Flakiness)

- **Bloqueio de Scripts de Anúncios:** A aplicação _Automation Exercise_ costuma disparar scripts de terceiros e _Google Vignettes_ que interceptam cliques. Foram configurados `blockHosts` e `cy.intercept` para anular requisições de ad services, garantindo execução fluida e rápida.
- **Massa de Dados Dinâmica:** Uso de `@faker-js/faker` e timestamps para garantir que cada teste seja 100% isolado e nunca falhe por conflito de dados existentes.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18, 20 ou superior)
- npm

### 1. Clonar ou Acessar a Pasta do Projeto

```bash
cd prova-teste-web
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Execução dos Testes

- **Modo Headless (Padrão CI / Terminal):**

  ```bash
  npm test
  ```

  _(ou `npm run test:electron`)_

- **Modo Interativo com Interface Gráfica (Cypress Test Runner):**
  ```bash
  npm run cy:open
  ```

---

## 📊 Relatórios de Execução

Após a execução dos testes no modo headless, o relatório do **Mochawesome** é gerado automaticamente na pasta `cypress/reports`:

- Abra o arquivo `cypress/reports/index.html` em qualquer navegador para visualizar o relatório interativo com gráficos, tempo de execução por teste e screenshots de eventuais falhas.

---

## 📦 Instruções para Entrega (Sem a pasta `node_modules`)

Conforme a observação da prova: _"se possível, remover a node_modules antes de fazer o zip para a entrega"_.

Para gerar o arquivo compactado de entrega sem a pasta `node_modules`, execute:

```bash
npm run clean:zip
```

O comando gerará o arquivo `entrega-prova-teste-web.zip` pronto para envio na plataforma.
