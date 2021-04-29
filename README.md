# Hippo

Hippo is a web-application built to provide users with the tools to improve their studying habits and remember large loads of information. <br>
<br>
The web-application was built using ReactJS, ExpressJS, and MySQL.

# Preview
TO DO: Add preview screenshots

# Installation and Setup
This project requires you to have [Node.js](https://nodejs.org/en/), [npm](https://www.npmjs.com/), and [MySQL](https://dev.mysql.com/downloads/mysql/) installed on your machine.
1. Clone the repository: `git clone https://github.com/bchau1000/hippo-web-app.git`
2. Execute the database schema script: `mysql -u 'your_username' -p < /path/to/db_schema.sql`
3. Configure the database variables in `/webserver/config.js`, you can also create a `.env` file and configure them there
4. Run `npm install` in both `/hippo-web-app/webserver/` and `/hippo-web-app/app`
5. To start the webserver, run `npm start` in `/hippo-web-app/webserver/`
6. To start the test suite, run `npm start` in `/hippo-web-app/app`
7. To visit the app: `http://localhost:3000/`

# Contributors
- [Brian Chau](https://github.com/bchau1000)
- [Cody Mangham](https://github.com/CodyMang)