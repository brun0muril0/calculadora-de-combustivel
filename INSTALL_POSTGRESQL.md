# Instalação do PostgreSQL

Este guia ajudará você a instalar e configurar o PostgreSQL para a aplicação Fuel Calculator.

## Windows

### Opção 1: Instalador Oficial
1. Baixe o instalador do PostgreSQL em: https://www.postgresql.org/download/windows/
2. Execute o instalador e siga as instruções
3. Anote a senha do usuário `postgres` que você definir
4. Certifique-se de que o PostgreSQL está rodando como serviço

### Opção 2: Via Chocolatey
```powershell
# Instale o Chocolatey se não tiver
# Depois execute:
choco install postgresql
```

## macOS

### Via Homebrew
```bash
# Instale o Homebrew se não tiver
# Depois execute:
brew install postgresql
brew services start postgresql
```

### Via Postgres.app
1. Baixe o Postgres.app em: https://postgresapp.com/
2. Arraste para a pasta Applications
3. Abra o aplicativo e clique em "Initialize"

## Linux (Ubuntu/Debian)

```bash
# Atualize os pacotes
sudo apt update

# Instale o PostgreSQL
sudo apt install postgresql postgresql-contrib

# Inicie o serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

## Configuração Inicial

### 1. Acesse o PostgreSQL
```bash
# No Windows (via Command Prompt)
psql -U postgres

# No macOS/Linux
sudo -u postgres psql
```

### 2. Crie o banco de dados
```sql
-- Execute no terminal do PostgreSQL
CREATE DATABASE fuel_calculator;
```

### 3. Execute o script de inicialização
```bash
# Saia do psql (digite \q) e execute:
psql -U postgres -d fuel_calculator -f backend/database/init.sql
```

### 4. Configure as credenciais
Edite o arquivo `backend/.env` com suas credenciais:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fuel_calculator
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
```

## Verificação da Instalação

### Teste a conexão
```bash
# Teste se consegue conectar
psql -U postgres -d fuel_calculator -c "SELECT COUNT(*) FROM brands;"
```

Se retornar um número (deve ser 10), a instalação está correta!

## Problemas Comuns

### Erro de conexão
- Verifique se o PostgreSQL está rodando
- Confirme a porta (padrão: 5432)
- Verifique usuário e senha

### Permissões no Linux
```bash
# Se tiver problemas de permissão
sudo -u postgres createdb fuel_calculator
sudo -u postgres psql -d fuel_calculator -f backend/database/init.sql
```

### Resetar senha do postgres
```bash
# No Linux/macOS
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'nova_senha';"
```

## Ferramentas Úteis

### pgAdmin (Interface Gráfica)
- Download: https://www.pgadmin.org/download/
- Útil para visualizar e gerenciar o banco de dados

### DBeaver (Alternativa gratuita)
- Download: https://dbeaver.io/download/
- Cliente universal para bancos de dados

## Próximos Passos

Após configurar o PostgreSQL:
1. Execute `npm run setup` na raiz do projeto
2. Configure o arquivo `backend/.env`
3. Execute `npm run dev` para iniciar a aplicação