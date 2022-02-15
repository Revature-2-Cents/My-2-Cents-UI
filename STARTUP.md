# Auth0 Setup
1. Create an Auth0 account
2. Create an new tenant called my-2-cents
3. Create an application called My 2 Cents
   - Application type: single page web application
4. Application Settings
   - Add localhost and UI web service URLs in Allowed Callback, Allowed Logout, Allowed Web Origins, and Allowed Origins(CORS)
5. Go Authentication -> Database -> Username-Password-Authentication
   - Turn on Custom Database toggle
   - Add these IP addresses to your database firewall setting:
     - ``18.232.225.224, 34.233.19.82, 52.204.128.250, 3.132.201.78, 3.19.44.88, 3.20.244.231``
   - Add script to Login, Create, Verify, Change Password, Get User, and Delete
     - Use Database settings on the bottom to entrypted server, database, username, password
     - Scripts can found in ``./Auth0-db-script``
6. Go to Angular project folder
7. Change domain and client ID in the auth_config.json in angular project
   - domain and client ID can be found in Auth0 application settings
