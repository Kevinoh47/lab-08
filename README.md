![CF](http://i.imgur.com/7v5ASc8.png) LAB - Express Routing & Middleware
=======================================================
[![Build Status](https://travis-ci.com/Kevinoh47/lab-08.svg?branch=working08)](https://travis-ci.com/Kevinoh47/lab-08)


## Work
notes.js module exports the following methods:
router.get('/api/v1/notes'...
router.get(('/api/v1/notes/:id'....
router.post('/api/v1/notes'...
router.put('/api/v1/notes/:id...
router.patch('/api/v1/notes/:id'...
router.delete('/api/v1/notes/:id...


users.js module exports the following methods:
router.get('/api/v1/users'...
router.get('/api/v1/users/:id'...
router.post('/api/v1/users'...
router.put('/api/v1/users/:id'...
router.patch('/api/v1/users/:id'...
router.delete('/api/v1/users/:id'...

Code passes tests and passes CI on Travis (minus the linting; see below for details).

Code is deployed on heruku at: https://codefellows-401-lab08.herokuapp.com/

However it just returns an error.

Also, despite lots of help from Cara and Ashley, locally it doesn't write to the db.json file. Using httpie i can read from the file, but POSTs return a 500 error. 

## Comments
Getting this to work all the way through travis-ci was very difficult. For a long time, the linter would run locally but not on travis... which we still haven't solved. For now, at John's suggestion, we have removed the linter rule from .travis.yml.

Once we set the linter problem aside, we still had issues to deal with. Local tests were still passing but not on travis. It turned out that 
.gitignore had lines for both 'db' and 'data' so git was not picking up the data/db.json file.... and therefore of course neither was travis. Ergo, even though tests would run locally, they failed on travis.

Also, there is something off with my vs code intellisense .. it appeared to be finding the path as i typed ../, but it was OFF one... almost as if vscode was interpreting the __dirname global variable off by one position. Cara helped my by texting me a snippet for const databaseFile... and it worked.  

Also Cara noticed that i didn't have a jest.config.js file, which, when added and correctly configured, removed some error reports for non-existent errors.

## Submission Instructions
* Follow the core Lab submission instructions. This must be fully tested and deployed at Heroku

## Before you begin
* You'll need to initialize this lab folder as a new node module, install your dependencies, setup your npm script commands, and pull in your config files
* Fire up RESTy ... you'll want to use this to test out your API!

## Overview
You have been provided a working and partially tested API server. The assignment for today is to extend that server's functionality by adding a new data model and an alternative storage mechanism.

## Assignment
#### Requirement 1: Add an additional model
* Add a second model called `users` to the API Server (in the `src/models` folder)
  * This model should expose the same interface as the `notes` model
  * This model should conform to the interface set forth by the memory data module
  * This model should contain the fields: _id, firstname, lastname, email, role
  * Perform the following data validations on save and update:
    * All fields are required
    * `email` is a valid email address
    * `role` is one of the following values: `user`, `editor`, `admin`
* Add a new route called `users` to the API Server (in the `src/api` folder)
  * This route should support all REST verbs for the `users` model

#### Requirement 2: Add an additional storage mechanism
* Currentlly, the models require a `storage` module called `memory`
* Create a new storage module called `file` and connect both models to it
  * This module should create and store the model database in a folder called `data` at the root of the project
* Implementation: comment/uncomment the models to switch between the 2 storage engines

###### Testing
* Minimal (happy path tests) have been provided for the `notes` routes
* Complete the tests for `notes` and write the tests for `users`
  * All REST methods should be exercised
  * Ensure good inputs and outputs (i.e. what if we have no id?)
    * This might lead you to change core code, which is good!
  * Seek out edge cases
* Your api tests should work the same regardless of which storage engine (`memory` or `file`) that you are using.
* There are currently no tests for the memory storage mechanism (or the file storage that you'll be creating)
  * Implement a test suite that covers the methods, return values, edge cases, and data integrity surrounding each of these.

###### Stretch Goals:
* Add a dynamic switch (maybe a setting in the .env file) that would switch out the storage engine dynamically based on a configuration
* Explore a way to unify the routes into ONE route that can access ANY model.
  * ... and along with that, a way to test the common route against any model and storage engine


##  Documentation
Include your travis badge at the top of your `README.md` file
In your `README.md`, describe the exported values of each module you have defined. Every function description should include it's airty (expected number of parameters), the expected data for each parameter (data-type and limitations), and it's behavior (for both valid and invalid use). Feel free to add any additional information in your `README.md` that you would like.




