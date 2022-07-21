# TinyTriumphs: A Child Tracker App

## Description

Keeping up with your baby’s needs can be an overwhelming experience for most parents. tinyTriumphs seeks to ease this process by helping parents keep track of their children’s developmental and medical milestones all in one place!

TinyTriumphs is a child tracker website, where a user can add, edit, delete their childrens developmental and medical milestones and take them from ToDo's to TaDa's. The application utilizes Node, Express, Handlebars, Multer, Moment.js, Sequelize and MySQL.


![tinyTriumps Homepage](https://user-images.githubusercontent.com/101844445/180118684-9770b5de-3fc2-4488-b737-a94a2ea47dd3.png)
![tinyTriumphs Child Profile](https://user-images.githubusercontent.com/101844445/180118778-b2a71487-b1b9-4d9c-8f0e-5d27cf997da6.png)
![tinyTriumphs gif](https://user-images.githubusercontent.com/101844445/180118833-5186dc6a-22e6-488a-a558-2167d21d6509.gif)

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
  - [License](#License)


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
MIT License

Copyright (c) 2022 tinyTriumphs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
