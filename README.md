# TinyTriumphs: A Child Tracker App

## Description

TinyTriumphs is a child tracker website, where a user can add, edit, delete their childrens developmental and medical milestones. The application utilizes Node, Express, Handlebars, Multer, Sequelize and MySQL.

## User Story
```md
As a user, I want to be able to track and catalog my childs milestones.
I WANT an application that can store my childs' milestones
SO THAT I can share them with others or keep track of them in a private library.
```

## Table of Contents
  - [Installation](#Installation)
  - [Usage](#Usage)
  - [Contributors](#Contributors)


## Installation

In order to clone and install TinyTriumphs to run locally, access to a MySQL database is required. 

```md
npm install
```
Run the following command to start MySQL server
* `mysql -u root --p`

Enter the MySQL password then run
* `source db/schema.sql`
* `exit`
Then 
* `npm run seed`
* `npm start`

## Contributors

<a href="https://github.com/tinyTriumphs/tinyTriumphs/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=tinyTriumphs/tinyTriumphs" />
</a>

Made with [contrib.rocks](https://contrib.rocks).


