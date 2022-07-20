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


## License

Copyright [2002]
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
