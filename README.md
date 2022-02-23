<p align="center">
   <img width="400px" src="/assets/buddy.png">
</p>
<h1 align="center">E-Commerce Automation for DevOps Pros</h1>



Hi

If you are wondering what this project is about, then let me explain.

This is the sample project for my talk **"E-Commerce Automation for DevOps Pros (with Buddy and Shopware 6)".**
It was part of the Webinar that I was allowed to do with Buddy (thanks for that).
Here is a link: https://buddy.works/webinars/ecommerce-automation-devops


The project contains all setups from that webinar.

## Projects

This repository consists of 3 different projects.
We cover a simple Shopware plugin, a full Shopware shop and a Shopware App backend service.

### Shopware Plugin
This use case is for plugin manufacturers that only have a plugin in their root repository.
You can easily switch the Shopware version around this plugin.

The Buddy pipeline in the webinar will cover a simple deployment in a hosted Shopware instance.
It will run the technical QA pipeline, install the plugin, and finally run some Cypress tests too.

### Shopware Shop
The shop sample is for agencies or merchants.
A full Shopware shop without any dependencies is added to the repository, along with every plugin and app that is required.

> I've just added the plugins and apps to the repository itself. You might want to go with composer ;)


You have to import the database, install dependencies, and then your local shop should work properly.
Just change whatever is necessary to have the feature that you or your customer needs.

The Buddy pipeline will of course contain the dependency installation, but also building storefront and administration
directly on Buddy, before deploying it to the server.
We use a CI/CD (Continuous Delivery) approach in here. 
Once approved, the rollout will happen, which also includes things like database migrations and finalizing things,
before we head over to the monitoring checks.


#### Shopware App Service
The Shopware App service is a simple web backend service application.
Our shop from the previous sample has the app installed and communicates with this, 3rd example.
One could use Symfony, or even a completely different language than PHP at all.

The Buddy pipeline is based on CI/CD (Continuous Deployment) although the sample application
might not have enough unit tests and analyzers for this approach ;)


## Installation

You can easily install the projects by just starting docker.
Navigate to the project folder and run this command (if you have Docker already installed).

```ruby 
docker-compose up -d
```

### Setup Shopware Shop
The project with the full Shopware shop needs a few more things.
A sample database is existing in this repository.

So after starting the container, make sure to run these commands to import your database.
They will make sure you have a empty database and import the backup file.

```ruby 
docker exec -i shop bash -c "mysql -uroot -proot -e \"drop database shopware;\"" 2> /dev/null; true
docker exec -i shop bash -c "mysql -uroot -proot -e \"create database shopware;\"" 2> /dev/null; true
docker exec -i shop mysql -uroot -proot shopware < ./shop_full.sql
```

The source code is already available with bind mounts.
We use anonymous mounts for this, so you might need to give those some permissions.
The easiest way is to just execute that on the whole DocRoot.

```ruby 
docker exec -it shop bash -c 'sudo chown www-data:www-data /var/www/html -R'
```

Now just go ahead and install dependencies and build Shopware artifacts.
We also set localhost as our domains

```ruby 
docker exec -it shop bash -c 'make prod'
docker exec -it shop bash -c 'make dump -B'
docker exec -it shop bash -c 'make build-storefront -B'
docker exec -it shop bash -c 'make build-admin -B'
docker exec -it shop bash -c 'php bin/console sales-channel:update:domain localhost'
docker exec -it shop bash -c 'php bin/console cache:clear'
```

You should now have your custom shop available at http://localhost 




Have fun!
Hope to see you at my next talk.

