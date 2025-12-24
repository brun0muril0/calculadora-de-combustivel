# Fuel Calculator - Calculadora de Combustível

Uma aplicação moderna e responsiva para calcular o consumo de combustível de veículos, desenvolvida com React, Node.js e PostgreSQL.

## 🚀 Funcionalidades

- **Seleção de Veículos**: Ampla base de dados com marcas e modelos populares
- **Cálculo de Distância**: 
  - Inserção manual da quilometragem
  - Cálculo automático via Google Maps API (origem e destino)
- **Cálculo Preciso**: Consumo baseado em dados reais dos veículos
- **Preços de Combustível**: Integração para obter preços médios regionais
- **Interface Moderna**: Design responsivo com tema claro e escuro
- **Histórico**: Salvamento dos cálculos realizados

## 🛠️ Tecnologias

### Backend
- Node.js
- Express.js
- PostgreSQL
- Axios (para APIs externas)

### Frontend
- React 18
- Tailwind CSS
- React Icons
- React Router
- Axios

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- PostgreSQL (versão 12 ou superior) - ou Docker
- Chave da API do Google Maps (opcional, para cálculo de rotas)

## 🔧 Instalação

### Opção 1: Instalação Manual

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd fuel-calculator-app
```

2. **Instale as dependências**
```bash
npm run setup
```

3. **Configure o banco de dados**
Siga as instruções em [INSTALL_POSTGRESQL.md](INSTALL_POSTGRESQL.md)

4. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo .env de exemplo
cp backend/.env.example backend/.env

# Edite o arquivo .env com suas configurações
```

5. **Inicie a aplicação**
```bash
npm run dev
```

### Opção 2: Usando Docker (Recomendado)

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd fuel-calculator-app
```

2. **Inicie o banco de dados com Docker**
```bash
docker-compose up -d postgres
```

3. **Instale as dependências**
```bash
npm run setup
```

4. **Configure o .env (use as configurações padrão do Docker)**
```bash
cp backend/.env.example backend/.env
# As configurações padrão já funcionam com o Docker
```

5. **Inicie a aplicação**
```bash
npm run dev
```

6. **Acesse o pgAdmin (opcional)**
- URL: http://localhost:8080
- Email: admin@fuelcalculator.com
- Senha: admin

A aplicação estará disponível em:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## ⚙️ Configuração

### Banco de Dados
Configure as credenciais do PostgreSQL no arquivo `backend/.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=fuel_calculator
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
```

### Google Maps API (Opcional)
Para habilitar o cálculo automático de rotas, siga as instruções em [GOOGLE_MAPS_SETUP.md](GOOGLE_MAPS_SETUP.md).

## 🧪 Testando a Instalação

Após configurar tudo, execute o teste de verificação:

```bash
npm run test-setup
```

Este comando verificará se:
- O backend está rodando
- O banco de dados está conectado
- As APIs estão funcionando
- Os cálculos estão corretos

## 📱 Como Usar

1. **Selecione a Marca**: Escolha a marca do seu veículo
2. **Escolha o Modelo**: Selecione o modelo específico
3. **Informe a Distância**: 
   - Digite manualmente a quilometragem, ou
   - Use o calculador de rota informando origem e destino
4. **Calcule**: Clique em "Calcular Consumo" para ver os resultados

## 🎨 Temas

A aplicação suporta tema claro e escuro, alternando automaticamente com base na preferência do usuário ou através do botão no cabeçalho.

## 📊 Base de Dados

A aplicação inclui uma base de dados com:
- 10+ marcas populares
- 30+ modelos de veículos
- Dados reais de consumo de combustível
- Suporte a diferentes tipos de combustível (Gasolina, Etanol, Diesel, Flex)

## 🔮 Funcionalidades Futuras

- [ ] Integração com APIs de preços de combustível em tempo real
- [ ] Comparação entre múltiplos veículos
- [ ] Relatórios de economia
- [ ] Notificações de variação de preços
- [ ] Modo offline
- [ ] Aplicativo mobile

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, abra uma issue no GitHub ou entre em contato através do email: suporte@fuelcalculator.com