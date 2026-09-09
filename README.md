# GROWIT

### Growth Regulator for Organized Work & Intelligent Tracking

GrowIt is a full-stack productivity and activity tracking application designed to help users organize daily activities, monitor progress, manage goals, and understand their productivity through analytics.

The current version is an MVP focused on authenticated activity tracking, goal management, productivity analytics, and a personalized dashboard experience.

---

## ✨ Features

### 🔐 Authentication
- User registration and login
- JWT-based authentication
- Protected application routes
- User-specific data isolation
- Secure password hashing with bcrypt

### ✅ Activity Tracking
- Create daily activities
- Record planned and actual time
- Track activity categories
- Mark activities as completed or pending
- Edit existing activities
- Delete activities
- View activities by date

### 🎯 Goal Management
- Create personal goals
- Set targets and deadlines
- Track goal progress
- Update goal status
- Edit and delete goals
- User-specific goal management

### 📊 Productivity Analytics
- Daily productivity statistics
- Weekly performance statistics
- Completion rate
- Planned vs actual time
- Performance scoring
- Category-based statistics
- Productivity trends
- Streak tracking
- Productivity insights
- 30-day activity analysis

### 📅 Calendar
- View activities by date
- Select individual dates
- See daily activity information
- Activity-based calendar visualization

### 🎨 User Experience
- Responsive interface
- Light and dark themes
- Warm Terracotta-inspired visual design
- Interactive charts
- Dashboard-based productivity overview
- Reusable React components

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Recharts
- Vite
- JavaScript
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Development Tools

- Git
- GitHub
- Nodemon

---

## 🏗️ Architecture

GrowIt follows a client-server architecture:

```text
                    ┌─────────────────────┐
                    │      React UI       │
                    │      Frontend       │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Express / Node.js │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │       MongoDB       │
                    │      Database       │
                    └─────────────────────┘



📁 Project Structure
GrowIt/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── activityController.js
│   │   ├── authController.js
│   │   └── goalController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Activity.js
│   │   ├── Goal.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── activityRoutes.js
│   │   ├── authRoutes.js
│   │   └── goalRoutes.js
│   │
│   ├── services/
│   │   ├── activityService.js
│   │   └── goalService.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   └── tracker/
│       ├── src/
│       │   ├── components/
│       │   ├── context/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── utils/
│       │   ├── App.jsx
│       │   ├── index.css
│       │   └── main.jsx
│       │
│       ├── .env.example
│       ├── package.json
│       └── vite.config.js
│
├── .gitignore
└── README.md
🚀 Getting Started
1. Clone the repository
git clone https://github.com/EmeraldSherin/GrowIt.git
cd GrowIt
2. Install backend dependencies
cd backend
npm install
3. Configure backend environment variables

Create:

backend/.env

Add your MongoDB connection string and JWT secret:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Do not commit .env to GitHub.

4. Start the backend

For development:

npm run dev

Or:

npm start

The backend runs on:

http://localhost:5000
5. Install frontend dependencies

Open another terminal:

cd frontend/tracker
npm install
6. Start the frontend
npm run dev

Vite will provide the local development URL, typically:

http://localhost:5173
🔑 Environment Variables
Backend

Create backend/.env:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
Frontend

If frontend environment variables are required, use:

frontend/tracker/.env

A template is provided in:

frontend/tracker/.env.example

Never commit actual secrets or credentials.

🔒 Authentication Flow

GrowIt uses JWT-based authentication.

User
 │
 ├── Register
 │      ↓
 │   Password hashed
 │      ↓
 │   User stored in MongoDB
 │
 └── Login
        ↓
    Credentials verified
        ↓
    JWT generated
        ↓
    Token stored by frontend
        ↓
    Token sent with API requests
        ↓
    Backend verifies user
        ↓
    User-specific data returned

Activities and goals are associated with authenticated users so that users can only access their own data.

📊 Analytics

GrowIt calculates productivity metrics from recorded activities, including:

Completion rate
Planned time
Actual time
Daily performance
Weekly performance
Category performance
Productivity streaks
Consistency
Recent productivity trends
Productivity insights

The dashboard uses these calculations to provide an overview of the user's activity and performance.

🎯 Project Goals

GrowIt is designed around a simple idea:

Small consistent actions lead to meaningful growth.

The application brings activity tracking, goals, calendar organization, and productivity analytics into one place.

🔮 Future Improvements

Planned improvements include:

More advanced productivity analytics
Improved personalization
Enhanced goal recommendations
More detailed reports
Better data visualization
Productivity forecasting
Additional dashboard insights
Deployment and production optimization
📌 Project Status

Current status: MVP

The core application functionality is implemented, including authentication, activity tracking, goals, calendar functionality, analytics, and dashboard visualization.

The project is actively being improved toward a more complete productivity management platform.

👨‍💻 Author

EmeraldSherin

GitHub:

https://github.com/EmeraldSherin/GrowIt