# NINJA-TEMPLATE
# AgroMart API

## Pre-requisites
* Nodejs 12+
* NPM packages (Install in global scope)
  * yarn (`npm i -g yarn`)
* Git

## Getting Started
* Clone the repo
* `cd {project folder}`
* `yarn install` Or just `yarn`  - **DO NOT USE `npm install`**

## Setup Code
* Add connection string of mongodb database in .env.
* Rename `example.env` file to `.env` <br />↳ Add values as specified

## Starting app
 * `yarn run dev` to start dev server
 * Do not use `yarn/npm start` - This is pointed towards prod start. Read `scripts` in package.json
 * API server is ready at http://localhost:3001/
