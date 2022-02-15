function getByEmail(email, callback) {
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
  const query = 'SELECT * FROM dbo.User_Login WHERE Email = @Email';
  connection.on('debug', function (text) {
    console.log(text);
  }).on('errorMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  }).on('infoMessage', function (text) {
    console.log(JSON.stringify(text, null, 2));
  });
  connection.on('connect', function (err) {
    if (err) return callback(err);
    const request = new Request(query, function (err, rowCount, rows) {
      if (err) return callback(err);
      if(rowCount<1) return callback(null);
			callback(null, {
          user_id: rows[0][0].value,
          nickname: rows[0][1].value,
          email: rows[0][2].value
      });
    });
    request.addParameter('Email', TYPES.NVarChar, email);
    connection.execSql(request);
  });
}
