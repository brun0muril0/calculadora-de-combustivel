# Configuração da API do Google Maps

Para habilitar o cálculo automático de distâncias entre dois pontos, você precisa configurar a API do Google Maps.

## 1. Criar um Projeto no Google Cloud Console

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Anote o ID do projeto

## 2. Habilitar as APIs Necessárias

1. No menu lateral, vá em "APIs e Serviços" > "Biblioteca"
2. Procure e habilite as seguintes APIs:
   - **Distance Matrix API** (obrigatória)
   - **Geocoding API** (recomendada)
   - **Maps JavaScript API** (para futuras melhorias)

## 3. Criar uma Chave de API

1. Vá em "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "Chave de API"
3. Copie a chave gerada
4. Clique em "Restringir Chave" para configurar as restrições

## 4. Configurar Restrições (Recomendado)

### Restrições de API
- Marque apenas as APIs que você habilitou:
  - Distance Matrix API
  - Geocoding API

### Restrições de Aplicativo (Opcional)
Para desenvolvimento local, você pode deixar sem restrições ou configurar:
- **Endereços IP**: Adicione seu IP local
- **Referenciadores HTTP**: Adicione `localhost:*`

## 5. Configurar no Projeto

1. Abra o arquivo `backend/.env`
2. Adicione sua chave de API:

```env
GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

## 6. Testar a Configuração

Execute o teste de configuração:

```bash
npm run test-setup
```

Se tudo estiver correto, você verá uma mensagem de sucesso.

## Custos

A API do Google Maps tem um modelo de preços baseado em uso:

- **Distance Matrix API**: $5.00 por 1.000 solicitações
- **Geocoding API**: $5.00 por 1.000 solicitações

### Cota Gratuita
O Google oferece $200 em créditos gratuitos por mês, o que equivale a:
- 40.000 solicitações da Distance Matrix API
- 40.000 solicitações da Geocoding API

Para a maioria dos casos de uso pessoal, isso é mais que suficiente.

## Alternativas Gratuitas

Se você não quiser usar a API do Google Maps, a aplicação ainda funciona perfeitamente com entrada manual de distância.

### APIs Alternativas (Futuras Implementações)
- **OpenRouteService**: Gratuita até 2.000 solicitações/dia
- **MapBox**: Gratuita até 100.000 solicitações/mês
- **HERE API**: Gratuita até 250.000 transações/mês

## Solução de Problemas

### Erro: "API key not valid"
- Verifique se a chave está correta no arquivo `.env`
- Confirme se a Distance Matrix API está habilitada
- Aguarde alguns minutos após criar a chave (pode demorar para ativar)

### Erro: "This API project is not authorized"
- Verifique as restrições da chave de API
- Confirme se o IP/domínio está autorizado

### Erro: "You have exceeded your rate-limit"
- Você atingiu o limite de solicitações
- Aguarde ou configure um plano de pagamento

## Monitoramento de Uso

1. No Google Cloud Console, vá em "APIs e Serviços" > "Painel"
2. Monitore o uso das APIs
3. Configure alertas de cota se necessário

## Segurança

⚠️ **Importante**: Nunca exponha sua chave de API no frontend ou em repositórios públicos!

- Mantenha a chave apenas no arquivo `.env` do backend
- Adicione `.env` ao `.gitignore`
- Use restrições de API e aplicativo
- Monitore o uso regularmente