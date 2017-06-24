# Flashcards API

Server API for [Flashcards App](https://github.com/Zdamian/flashcards-app) client single page application

# Setup environment

## Global *npm* dependencies

If you are working on Windows you need to install `nodemon` package globally
```bash
>> npm install nodemon -g
```

## MongoDB

API uses MongoDB as a database. Before running server be sure you have installed and running MongoDB. For more info go here [https://docs.mongodb.com/manual/installation/](https://docs.mongodb.com/manual/installation/)

## Cloning repo and run server API

To clone this repo and run API simply run the following commands
```bash
>> git clone git@github.com:Zdamian/flashcards-api.git
>> cd flashcards-api
>> npm install
>> npm run loadcategories
>> npm run loadwords
>> nodemon
```
After `npm run loadcategories` and `npm run loadwords` you should press `Ctrl+C` to exit and then run `nodemon`

