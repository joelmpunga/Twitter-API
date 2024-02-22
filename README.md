# Twitter-API documentation

## Welcome to Twitter Application : for Joel MPUNGA Devs and data analyst

## CONFIGURATION
==================

### This application uses port 3000,it means you have to config your port to this number 3000
### All of the endpoints used by this application will be listening on port 3000 and are listed here :

#### GET METHOD     
* /posts *it's used to get all of the posts in our database*
* /posts/:id *it's used to get one post knowing the of this post in our database*
* /posts *it's used to get all of the users in our database*
* /posts/:id *it's used to get one user knowing the of this user in our database*
* Etc.

#### POST METHOD    
* /posts *it's used to add a new post in our database*
* /posts/like/ *it's used to like a specific post by click down (on the like icon)*
* /posts/delike/ *it's used to remove or to cancel a like on a specific post by click down (on the like icon)*
* /users/login *it's used to log in the application by submitting the authentication informations*
* /profil/edit/id *it's used to update user knowing the id of this user in our database*

* Etc.

## DATABASE
==================

### In this application, we use the ORM database Prisma to connect to our DBMS PostgreSQL database

### The database model is created in prisma/schema.prisma file

## Model, Controller and Route
===============================

### The model is created in public directory

### In vision to improve performance, a lot of models are created in controllers directory

## Package dependencies

### To install a package dependencies we need to type npm install --save
### To install a package one by one, we need to type npm install *name* --save

