# The Year Book
A simple year book web app.

## Technology Stack:

###1. DESIGN PATTERN (MVC)
   - **Model:**
      NO-SQL MONGO-DB was used with MONGOOSE ODM
   - **View:** 
      Handlebars-js templating engine was used with native HTML and CSS
    - **Controller:** 
      All controller and server-side logic was wriiten in JavaScript (Node-js alongside Express-js)

###2. AUTHENTICATION:
"Passport-js" using local strategy
  
###3. SESSION MANAGEMENT:
"express-session" integrated with "passport-js"
  
###4. IMAGE STORAGE:
Images are stored inside database in base-64 format and uploaded using "multer"
 
###5. PASSWORD HASHING:
Password hashing is done using "bcrypt"
 
###6. EMAIL VERIFICATION:
Email verification is done using "nodemailer" and "OAuth2" protocol (google cloud api). Verification hash is generated using "crypto" 

###7. APP AND DATABASE HOSTING:
1. App: Heroku
2. Database: Mongodb Atlas