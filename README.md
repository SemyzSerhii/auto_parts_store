# Auto parts store

Ruby version 2.5.1

Rails version 5.2.2

React version 16.8.2

Node version 8.15.0

NPM version 6.4.1

 ### Installation
  
  Clone repository. 
  
        $ bundle

  Create .env with: 
   * db_host = localhost
   * db_port = 3000
   * db_name
   * db_username
   * db_password
   * S3_KEY
   * S3_SECRET
   * S3_REGION
   * S3_BUCKET
   
#### Database creation

      $ rake db:create

#### Database initialization

      $ rake db:migrate
      $ rake db:seed

 ### Usage

      $ rails s
      
* Swagger http://localhost:3000/api-docs/index.html

* Active admin http://localhost:3000/admin

### Frontend

        $ cd frontend
        $ npm install
        $ npm start
