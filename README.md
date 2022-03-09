# Automated tests for learn.eie.org
These tests are writted to assist in spotting issues on our learning platform. They are made to work in association with manual tests, but to allieve some of the tedium of doing certain tasks repetitively.

## Manual test scripts
TBD

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) - the javascript framework in which Cypress is built upon
- [git](https://github.com/git-guides/install-git) - change management system to get the latest updates to these tests

## Installing Cypress
Cypress is the automated testing framework that these tests are built in. After installing the prerequisites, from your command line run

```
npm install -g cypress
```

## Setting up the project the code

### Get the code
Run
```
git clone https://github.com/cchapman900/learn.eie.org-testing.git
```

### Install the packages 
Change into the project directory
```
cd learn.eie.org-testing
```
and run the following within the project directory
```
npm install
```

### Configure the .env file.

The environment variables file is where sensitive information is stored which shouldn't be publicly available (such as in this git repo).

Copy the `.env.example` file to `.env`, and get the necessary credentials from a team member.

## Running tests

### From the command line
```
npm run test
```
### From the GUI
Cypress should be available as a regular application from which to run the tests you need.