# App Challenge

One Paragraph of project description goes here

## Getting Started

This is a project that utilizes a nodejs backend and react front end. A user logs in with his/her phone and password, and receives a response from the server with a list of tasks

### Prerequisites

In order to run this make sure you have installed react and mysql as well as nodejs. 

First cd, into the backend directory. Once in the root of the directory, run npm install to install all the packages list in the packages.json file. 

After installation, cd into server dir. Once in the server directory, you should see a file labled create_db.js. Edit the file with you mysql host, password and user name. Run the file. This should create a db called personnel ( if it doesnt exist )
wit
After that completes successfully, run the file named populate_db.js (edit with credentials) to populate the db we just created.

Once all these are completed, we can now fire up our node server. Run nodemon server.js


After the backend if fired up and running, cd in to the front end directory. Here you will see the directory's package.json file. Run npm install to install all dependencies.

Once this is complete, run npm start

You'll be redirected to a login page. 

Enter phone: 0722222222
      password: 123456

This will display a list of tasks







