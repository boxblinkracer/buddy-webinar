#
# Author: Christian Dangl
#

.PHONY: help
.DEFAULT_GOAL := help


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ---------------------------------------------------------------------------------------------

import-db: ## Restores the Database from the clean dump
	@echo "\n  >> creating database..."
	docker exec -i shop bash -c "mysql -uroot -proot -e \"drop database shopware;\"" 2> /dev/null; true
	docker exec -i shop bash -c "mysql -uroot -proot -e \"create database shopware;\"" 2> /dev/null; true
	docker exec -i shop mysql -uroot -proot shopware < ./shop.sql

export-db: ## Creates a clean MySQL dump
	@docker exec -i shop mysqldump -u root -proot --lock-tables shopware > ./shop.sql

# ---------------------------------------------------------------------------------------------

run: ## Prepares and runs Shopware
	docker exec -it shop bash -c 'sudo chown www-data:www-data /var/www/html/var/cache -R'
	docker exec -it shop bash -c 'sudo chown www-data:www-data /var/www/html/vendor -R'
	docker exec -it shop bash -c 'composer install'
	docker exec -it shop bash -c 'php bin/console theme:compile'
	docker exec -it shop bash -c 'php bin/console cache:clear'


reset: ## Resets Shopware
	docker exec -it shop bash -c "mysql -uroot -proot -e \"drop database shopware;\"" 2> /dev/null; true
	docker exec -it shop bash -c "mysql -uroot -proot -e \"create database shopware;\"" 2> /dev/null; true
	docker exec -it shop bash -c 'sudo rm -f /var/www/html/config/jwt/private.pem'
	docker exec -it shop bash -c 'sudo rm -f /var/www/html/config/jwt/public.pem'
	docker exec -it shop bash -c 'php bin/console system:install --force'
	docker exec -it shop bash -c 'php bin/console user:create --admin -p shopware admin'
	docker exec -it shop bash -c 'php bin/console cache:clear'
