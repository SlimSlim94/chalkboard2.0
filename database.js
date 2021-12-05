const { MongoClient } = require('mongodb');

const connectionString = 'mongodb://localhost:27017/';

// Connects to the Chalkboard database
function connect(onConnect) {
  const mongoClient = new MongoClient(connectionString);
  mongoClient.connect((err, client) => {
    if (err) {
      console.log(err);
      return;
    }
    // Retrieving the database object
    const db = client.db('chalkboard');
    // Calling handler on connection
    onConnect(db, () => {
      // Closing the connection
      client.close();
    });
  });
}

// Checks whether user exists with the given username
// Calls back the onResult function with the result of search
exports.userExists = (username, onResult) => {
  connect((db, onFinish) => {
    const users = db.collection('users');
    users.count({ username })
      .then((count) => {
        onResult(count > 0);
        onFinish();
      });
  });
};

// Sign-ups the user with the given data
exports.signUp = (user) => {
  connect((db, onFinish) => {
    const users = db.collection('users');

    // Inserting new user record
    users.insertOne(user, (err) => {
      if (err) console.log(err);

      onFinish();
    });
  });
};

// Checks whether such credentials are valid
exports.login = (credentials, onFind) => {
  connect((db, onFinish) => {
    const users = db.collection('users');

    users
      .find(
        { username: credentials.login, password: credentials.password },
      )
      .next()
      .then((user) => {
        onFind(user);
        onFinish();
      });
  });
};

// Searches the database with the given search query
exports.search = (query, onFind) => {
  connect((db, onFinish) => {
    const usersCollection = db.collection('users');

    // Preparing roles
    const roles = [];
    if (query.students === 'on') roles.push({ role: 'student' });
    if (query.instructors === 'on') roles.push({ role: 'teacher' });
    // Search query
    const dbQuery = { username: { $regex: query.searchQuery } };
    if (roles.length) {
      dbQuery.$or = roles;
      usersCollection.find(dbQuery)
        .toArray()
        .then((result) => {
          onFind(result);
          onFinish();
        });
    }
    else onFinish({});
  });
};
