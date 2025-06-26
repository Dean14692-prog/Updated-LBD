
# Local Business Directory

A modern, responsive web application that showcases local businesses across Kenya by category, and location. This platform helps users easily discover, filter, and explore business listings empowering communities to support local enterprises.

## Features

- View Businesses – Browse listed businesses with images, names, and descriptions.
- Filter by Category – Dynamically filter businesses by selected category.
- Responsive Design – Fully responsive layout built with Tailwind CSS and gradients.
- Static Pages – Includes About, Contact, and Privacy Policy pages.
- Navigation – Clean navigation and animated footer with smooth routing using `react-router-dom`.
- Authentication – Sign-up and login functionality connected to a Flask backend.
- Backend API – Powered by a RESTful Flask API (`localhost:5555`).

## Technologies Used

### Frontend

- React (via Vite)
- Tailwind CSS – Utility first CSS framework
- React Router DOM – Client-side routing
- Axios and Fetch API – For HTTP requests
- Material UI (MUI) – Additional UI components

### Backend

- Flask – Python backend framework
- Flask-SQLAlchemy – ORM for database models
- SQLite – Database
- Flask-CORS – To enable cross-origin requests

## Pages & Routes

| Route           | Description                        |
|----------------|------------------------------------|
| `/`            | Landing Page / Home                |
| `/categories`  | Browse businesses by category      |
| `/about`       | Information about the platform     |
| `/contact`     | Contact information and support    |
| `/signup`      | User registration form             |
| `/login`       | User login form                    |

## Project Structure

client/
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CategoriesPage.jsx
│   ├── SignupForm.jsx
│   ├── LoginForm.jsx
│   └── ...
├── pages/
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── LandingPage.jsx
│  
├── App.js
└── main.jsx

server/
├── app.py
├── models.py
├── debug.py
├── seed.py
├── migration
├── instance
└── db.sqlite3

## Setup Instructions

### Backend (Flask)

1. Clone the repository:

   ```bash
   git clone git@github.com:Dean14692-prog/Updated-LBD.git
   cd Updated-LBD/server
   ```

2. Set up and activate a virtual environment:

   ```bash
   pipenv install && pipenv shell
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask app:

   ```bash
   flask run
   ```

### Frontend (React)

1. Open a new terminal and go to the client folder:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React app:

   ```bash
   npm run dev  
   ```

4. Visit: http://localhost:5173

## Sample API Endpoints

| Endpoint                    | Method | Description                        |
|----------------------------|--------|------------------------------------|
| `/business_profiles`       | GET    | Fetch all businesses               |
| `/categories`              | GET    | Fetch all categories               |
| `/users`                   | POST   | Create a new user                  |
| `/login`                   | POST   | Authenticate user credentials      |


## Collaborators
- Dennis Ngui
- Rose Momanyi  
- Ken Tuei  
- Aaron Rashid  
- Elvis Elly  
- Yelsin Kiprop

## License

This project is open-source and available under the MIT License.

Support Local. Discover More.