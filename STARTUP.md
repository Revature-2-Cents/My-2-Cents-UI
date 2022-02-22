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
     - `18.232.225.224, 34.233.19.82, 52.204.128.250, 3.132.201.78, 3.19.44.88, 3.20.244.231`
   - Add script to Login, Create, Verify, Change Password, Get User, and Delete
     - Use Database settings on the bottom to entrypted server, database, username, password
     - Scripts can found in `./Auth0-db-script`

# Angular project Start up
1. `cd` into the project folder
2. Run `npm install`
3. Change domain and client ID in the `auth_config.json` in angular project
   - domain and client ID can be found in Auth0 application settings
4. Run `npm install -g @angular/cli` if you don't have angular CLI installed
5. Run `ng serve` or `npm start` to start the project in local

# API Start up
1. Install dotnet ef tool if you haven't installed
   - `cd` to API project folder
   - Run the following commands:
     - `dotnet new tool-manifest` 
     - `dotnet tool install dotnet-ef`
     - `dotnet ef` checks if you install successfully

2. install Nuget package into project solution: Microsoft.EntityFrameworkCore.Design, Microsoft.EntityFrameworkCore.SqlServer
3. Run EF scaffold command if you update any structure in database
   - `cd ./My2Cents.API/My2Cents.DataInfrastructure/ScaffoldModel/`
   - `dotnet ef dbcontext scaffold '<db-connection-string>' Microsoft.EntityFrameworkCore.SqlServer --no-onconfiguring --force `
