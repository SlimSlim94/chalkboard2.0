# Installation

## NPM packages

Install the required packages with the command in project folder

  npm ci

## Database

Create the MongoDB database with the name chalkboard and collection named users.
Import data into the collection users using the JSON file user.json from the data folder.

# Running the server

Type node index.js to start running the server.
Access the index page through the url http://localhost/html/index.html

# Using the hosting

Update the connectionString constant in the database.js with the connection string to the MongoDB.
Update the hostingAddress constant in the file public/js/common.js with the address to hosting site.