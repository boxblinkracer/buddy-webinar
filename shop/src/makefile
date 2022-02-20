#
# Author: Christian Dangl
#

.PHONY: help
.DEFAULT_GOAL := help


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# ---------------------------------------------------------------------------------------------

dev: ## Installs DEV dependencies
	composer install --no-scripts

prod: ## Installs PROD dependencies
	composer install --no-dev --no-scripts

build-storefront: ## Builds the Storefront
	php bin/console theme:compile
	php bin/console cache:clear

build-admin: ## Builds the Administration
	./bin/build-administration.sh