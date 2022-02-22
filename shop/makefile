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
	docker exec -i shop mysql -uroot -proot shopware < ./shop_full.sql

export-db: ## Creates a clean MySQL dump
	@docker exec -i db mysqldump -u root -proot --lock-tables shopware > ./shop.sql

# ---------------------------------------------------------------------------------------------

run: ## Prepares and runs Shopware
	make import-db -B
	# ------------------------------------------------------------------------------------
	docker exec -it shop bash -c 'sudo chown www-data:www-data /var/www/html -R'
	# ------------------------------------------------------------------------------------
	docker exec -it shop bash -c 'make prod'
	docker exec -it shop bash -c 'make dump -B'
	docker exec -it shop bash -c 'make build-storefront -B'
	docker exec -it shop bash -c 'make build-admin -B'
	docker exec -it shop bash -c 'php bin/console sales-channel:update:domain localhost'
	docker exec -it shop bash -c 'php bin/console cache:clear'
	# ------------------------------------------------------------------------------------
	docker exec -it shop bash -c 'php bin/console plugin:refresh'
	docker exec -it shop bash -c 'php bin/console plugin:uninstall DockwareSamplePlugin'
	docker exec -it shop bash -c 'php bin/console plugin:install DockwareSamplePlugin --activate' 2> /dev/null || true
	docker exec -it shop bash -c "php bin/console cache:clear"
	docker exec -it shop bash -c "php bin/console system:config:set DockwareSamplePlugin.config.active true"
	# ------------------------------------------------------------------------------------
	@open http://localhost/admin
	@open http://localhost

# ---------------------------------------------------------------------------------------------

reset: ## Resets Shopware
	docker exec -it shop bash -c "mysql -uroot -proot -e \"drop database shopware;\"" 2> /dev/null; true
	docker exec -it shop bash -c "mysql -uroot -proot -e \"create database shopware;\"" 2> /dev/null; true
	docker exec -it shop bash -c 'sudo rm -f /var/www/html/config/jwt/private.pem'
	docker exec -it shop bash -c 'sudo rm -f /var/www/html/config/jwt/public.pem'
	docker exec -it shop bash -c 'php bin/console system:install --force'
	docker exec -it shop bash -c 'php bin/console user:create --admin -p shopware admin'
	docker exec -it shop bash -c 'php bin/console cache:clear'
