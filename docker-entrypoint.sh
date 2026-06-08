#!/bin/sh
set -e

# If .env does not exist, copy from .env.example
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
fi

# Ensure database directory exists and touch sqlite file
echo "Initializing SQLite database..."
mkdir -p database
touch database/database.sqlite

# Run key generation if APP_KEY is empty or not set
if ! grep -q "APP_KEY=base64:" .env || [ -z "$(grep APP_KEY .env | cut -d'=' -f2)" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Ensure correct permissions for web server
echo "Setting permissions for storage, cache, and database..."
chown -R www-data:www-data /var/www/html/storage
chown -R www-data:www-data /var/www/html/bootstrap/cache
chown -R www-data:www-data /var/www/html/database

# Run migrations
echo "Running database migrations..."
php artisan migrate --force

# Execute the CMD passed to docker run (e.g. apache2-foreground)
exec "$@"
