function verify (email, callback) {
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

  const query = "UPDATE dbo.User_Login SET Email_Verified = 'true' WHERE Email_Verified = 'false' AND Email = @Email";

  connection.on('debug', function(text) {
    console.log(text);
  }).on('errorMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function(text) {
    console.log(JSON.stringify(text, null, 2));
  });

  connection.on('connect', function (err) {
    if (err) return callback(err);

    const request = new Request(query, function (err, rows) {
      if (err) return callback(err);
      // console.log('rows: ' + rows);
      callback(null, rows > 0);
    });

    request.addParameter('Email', TYPES.VarChar, email);

    connection.execSql(request);
  });
}
