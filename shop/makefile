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
	docker exec -i shop bash -c "mysql -uroot -proot -e \"drop database shopware; create database shopware;\"" 2> /dev/null; true
	docker exec -i shop mysql -uroot -proot shopware < ./shop.sql

export-db: ## Creates a clean MySQL dump
	@docker exec -i shop mysqldump -u root -proot --lock-tables shopware > ./shop.sql
