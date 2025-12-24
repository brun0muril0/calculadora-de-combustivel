const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando Fuel Calculator...\n');

// Função para executar comandos
function runCommand(command, cwd = process.cwd()) {
  try {
    console.log(`Executando: ${command}`);
    execSync(command, { stdio: 'inherit', cwd });
    return true;
  } catch (error) {
    console.error(`Erro ao executar: ${command}`);
    console.error(error.message);
    return false;
  }
}

// Verificar se o Node.js está instalado
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js encontrado: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js não encontrado. Por favor, instale o Node.js primeiro.');
  process.exit(1);
}

// Instalar dependências do projeto raiz
console.log('\n📦 Instalando dependências do projeto raiz...');
if (!runCommand('npm install')) {
  console.error('❌ Falha ao instalar dependências do projeto raiz');
  process.exit(1);
}

// Instalar dependências do backend
console.log('\n📦 Instalando dependências do backend...');
if (!runCommand('npm install', path.join(process.cwd(), 'backend'))) {
  console.error('❌ Falha ao instalar dependências do backend');
  process.exit(1);
}

// Instalar dependências do frontend
console.log('\n📦 Instalando dependências do frontend...');
if (!runCommand('npm install', path.join(process.cwd(), 'frontend'))) {
  console.error('❌ Falha ao instalar dependências do frontend');
  process.exit(1);
}

// Verificar se o arquivo .env existe
const envPath = path.join(process.cwd(), 'backend', '.env');
if (!fs.existsSync(envPath)) {
  console.log('\n⚠️  Arquivo .env não encontrado no backend');
  console.log('Por favor, configure o arquivo backend/.env com suas credenciais do banco de dados');
} else {
  console.log('\n✅ Arquivo .env encontrado');
}

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Configure o PostgreSQL e execute o script backend/database/init.sql');
console.log('2. Configure as variáveis de ambiente no arquivo backend/.env');
console.log('3. Execute "npm run dev" para iniciar a aplicação');
console.log('\n🌐 A aplicação estará disponível em:');
console.log('   Frontend: http://localhost:3000');
console.log('   Backend: http://localhost:5000');