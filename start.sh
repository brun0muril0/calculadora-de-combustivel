#!/bin/sh

# Navegue até o diretório do projeto
cd /var/www

# Verifique se o .env existe, caso contrário, crie a partir do .env.example
if [ ! -f .env ]; then
    cp .env.example .env
fi

# Instale as dependências do Composer
composer install

# Gere a chave da aplicação
php artisan key:generate

# Execute as migrações
php artisan migrate

# Defina permissões para o arquivo .env
chown www-data:www-data /var/www/.env
chmod 644 /var/www/.env

# Defina permissões para o banco de dados SQLite
chown -R www-data:www-data /var/www/database/database.sqlite
chmod 664 /var/www/database/database.sqlite

# Defina permissões para o diretório storage
chown -R www-data:www-data /var/www/storage

# Executa o comando original do contêiner (PHP-FPM neste caso)
exec docker-php-entrypoint php-fpm