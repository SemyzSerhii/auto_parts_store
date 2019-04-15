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
   * DB_HOST=localhost
   * DB_PORT=5432
   * DB_NAME
   * DB_USERNAME
   * DB_PASSWORD
   * S3_KEY
   * S3_SECRET
   * S3_REGION
   * S3_BUCKET
   * SECRET_KEY_BASE
   * SMT_USERNAME
   * SMTP_PASSWORD
   
#### Database creation

      $ rake db:create

#### Database initialization

      $ rake db:migrate
      $ rake db:seed

### Usage

      $ rails s

### Swaggerize API
      $ rake rswag:specs:swaggerize
      
* Swagger http://localhost:3000/api-docs/index.html

* Active admin http://localhost:3000/admin

### Frontend

        $ cd frontend
        $ npm install
        $ npm start
