FROM php:8.3-fpm-alpine3.19

# Install system dependencies and PHP extensions dependencies
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

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy the start script
COPY start.sh /usr/local/bin/start.sh

# Ensure the start script is executable
RUN chmod +x /usr/local/bin/start.sh

# Copy the default .env.example to .env
COPY .env.example /var/www/.env

# Copy application source code
COPY . /var/www

# Install Node.js dependencies and build assets
RUN npm install && npm run build

# Set permissions for .env
RUN chmod 644 /var/www/.env

EXPOSE 9000

# Change the entrypoint to the start script
ENTRYPOINT ["start.sh"]