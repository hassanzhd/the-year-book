# The Year Book

A platform for students of all batches to have year books of their own.

## TODOS:

- [ ] BACKEND:

  - [ ] Express app setup
  - [ ] API
    - GET all user
    - GET one user
    - POST one user
    - PUT one user
    - DELETE one user
  - [ ] Authentication (Passport)
  - [ ] Setup multer for image upload
  - [ ] Setup an email client that sends verification email (optional)

- [ ] VIEWS:

  - [ ] Handlebars/ ejs setup
  - [ ] Helper (handlebars) setup (if needed)
  - [ ] Tailwind/ Bootstrap for styling

- [ ] DATABASE:
  - [ ] Setup mongoose
  - [ ] Models:
    - [ ] User model
      - name
      - batch
      - tagline
      - image
      - verification hash (optional)
      - email (regex for email: ^k([0-9]{6})(@nu\.edu\.pk)\$)
