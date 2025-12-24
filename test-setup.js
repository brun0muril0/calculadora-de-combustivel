const axios = require('axios');

async function testSetup() {
  console.log('🧪 Testando configuração da aplicação...\n');

  // Teste 1: Verificar se o backend está rodando
  try {
    console.log('1. Testando conexão com o backend...');
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend está funcionando:', response.data.message);
  } catch (error) {
    console.log('❌ Backend não está rodando. Execute "npm run dev" primeiro.');
    return;
  }

  // Teste 2: Verificar se as marcas estão carregando
  try {
    console.log('\n2. Testando carregamento de marcas...');
    const response = await axios.get('http://localhost:5000/api/brands');
    console.log(`✅ ${response.data.length} marcas carregadas com sucesso`);
  } catch (error) {
    console.log('❌ Erro ao carregar marcas. Verifique a conexão com o banco de dados.');
    console.log('Erro:', error.message);
    return;
  }

  // Teste 3: Verificar se os carros estão carregando
  try {
    console.log('\n3. Testando carregamento de carros...');
    const response = await axios.get('http://localhost:5000/api/brands/1/cars');
    console.log(`✅ ${response.data.length} carros carregados para a primeira marca`);
  } catch (error) {
    console.log('❌ Erro ao carregar carros.');
    console.log('Erro:', error.message);
    return;
  }

  // Teste 4: Testar cálculo de combustível
  try {
    console.log('\n4. Testando cálculo de combustível...');
    const response = await axios.post('http://localhost:5000/api/calculator/calculate', {
      carId: 1,
      distance: 100,
      origin: 'Teste',
      destination: 'Teste'
    });
    console.log('✅ Cálculo realizado com sucesso');
    console.log(`   Combustível necessário: ${response.data.fuelNeeded}L`);
    if (response.data.totalCost) {
      console.log(`   Custo estimado: R$ ${response.data.totalCost}`);
    }
  } catch (error) {
    console.log('❌ Erro no cálculo de combustível.');
    console.log('Erro:', error.message);
    return;
  }

  console.log('\n🎉 Todos os testes passaram! A aplicação está funcionando corretamente.');
  console.log('\n📱 Acesse a aplicação em:');
  console.log('   Frontend: http://localhost:3000');
  console.log('   Backend: http://localhost:5000');
}

// Executar os testes
testSetup().catch(error => {
  console.error('❌ Erro durante os testes:', error.message);
  process.exit(1);
});