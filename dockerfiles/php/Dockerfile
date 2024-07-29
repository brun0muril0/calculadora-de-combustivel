FROM php:8.3-fpm-alpine3.19

# Instala as dependências e as extensões do PHP
RUN apk add --no-cache \
    bash \
    curl \
    libpng-dev \
    libzip-dev \
    zlib-dev \
    sqlite-dev \
    nodejs \
    npm \
    freetype-dev \
    libjpeg-turbo-dev

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd \
    && docker-php-ext-install zip \
    && docker-php-ext-install pdo_sqlite

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www

COPY .env.example /var/www/.env

RUN composer install

RUN php artisan key:generate

RUN php artisan migrate

RUN npm install && npm run build

RUN chmod 644 /var/www/.env \
    && chown www-data:www-data /var/www/.env

RUN if [ -f /var/www/database/database.sqlite ]; then \
    chown www-data:www-data /var/www/database/database.sqlite \
    && chmod 664 /var/www/database/database.sqlite; \
    fi

RUN chown -R www-data:www-data /var/www/storage

EXPOSE 9000

ENTRYPOINT ["docker-php-entrypoint", "php-fpm"]