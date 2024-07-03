
# Quote of the Day Website

This is a full-stack **Quote of the Day** website built using **Express.js** for the backend and **HTML, CSS, and JavaScript** for the frontend. The website allows users to view a random quote from an API, search for quotes by author name, and enjoy a responsive user interface.

## Features

- View a random quote of the day
- Search for quotes by author name
- Responsive user interface
- User authentication (signup and login) using bcrypt and JWT

## Technologies Used

- **Backend**: 
  - Express.js: Backend framework for building APIs
  - bcrypt: Library for hashing passwords
  - JWT: JSON Web Token for authentication
  - cors: Middleware for enabling Cross-Origin Resource Sharing
- **Frontend**: 
  - HTML: Markup language for creating web pages
  - CSS: Stylesheet language for designing web pages
  - JavaScript: Programming language for adding interactivity to web pages
- **Database**: 
  - MongoDB: NoSQL database for storing quote and user information

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine
- MongoDB Atlas account (or a locally running MongoDB server)

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```git clone https://github.com/your-username/Techplement.git```
   ``` cd Techplement/week1-tasks```
   
2. Install Dependencies:
   1. Install Server Dependencies:
      ```npm install```

3. Set up Environment Variables:
   Create a ```.env``` file in the root directory and provide the following variables:
   ```PORT=5000```
   ```MONGODB_URI=<your_mongodb_uri>```
   ```SECRET_KEY=<your_secret_key>```

4. Run the application:
   Start the server:
   ```npm start```

5. Access the Application:
   Open your web browser and go to `http://localhost:5000` to access the Quote of the Day website.

## Usage
- View a random quote on the homepage.
- Search for quotes by entering an author's name in the search bar.
- Register a new account or login with existing credentials to access additional features.

## Acknowledgements
Express.js
MongoDB
bcrypt
JWT
cors

## Contact
For questions or support, please contact mukulrajput9193@gmail.com

- Make sure to update the repository URL and any other placeholders with your actual information before using the README file.
