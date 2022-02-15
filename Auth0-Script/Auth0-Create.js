function create(user, callback) {
  //this example uses the "tedious" library
  //more info here: http://pekim.github.io/tedious/index.html
  const bcrypt = require('bcrypt');
  const sqlserver = require('tedious@1.11.0');
  const Connection = sqlserver.Connection;
  const Request = sqlserver.Request;
  const TYPES = sqlserver.TYPES;
  const connection = new Connection({
    userName:  configuration.username,
    password:  configuration.password,
    server:    configuration.server,
    options:  {
      database: configuration.database,
      rowCollectionOnRequestCompletion: true,
      encrypt: true
    }
  });

  const query = "INSERT INTO dbo.User_Login VALUES (@Username, @Email, @Password, 'false')";

  connection.on('debug', function(text) {
    // Uncomment next line in order to enable debugging messages
    // console.log(text);
  }).on('errorMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function(text) {
    // Uncomment next line in order to enable information messages
    // console.log(JSON.stringify(text, null, 2));
  });
  connection.on('connect', function (err) {
    if (err) return callback(err);

    var request = new Request(query, function (err, rows) {
      if (err) { return callback(err); }
      console.log('rows: ' + rows);
      callback(null);
    });

    bcrypt.hash(user.password, 10, function (err, hashedPassword) {
      if (err) { return callback(err); }
      request.addParameter("Username", TYPES.NVarChar, user.username);
      request.addParameter('Email', TYPES.VarChar, user.email);
      request.addParameter('Password', TYPES.VarChar, hashedPassword);
      connection.execSql(request);
    });
  });
}
