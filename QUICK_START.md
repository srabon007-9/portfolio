# MERN Portfolio - Quick Start Guide

## ⚡ 5-Minute Quick Start

### Step 1: Copy Environment Files

**Backend:**
```bash
cd server
cp .env.example .env
```

Edit `server/.env` and add:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

**Frontend:**
```bash
cd ../client
cp .env.example .env
```

The `.env` file should already have:
```
REACT_APP_API_URL=http://localhost:5000
```

### Step 2: Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

### Step 3: Run Both Servers

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Should show: "MERN Portfolio Backend is Running"
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
# Should automatically open http://localhost:3000
```

### Step 4: View Your Portfolio

Open your browser to `http://localhost:3000`

---

## 📱 Project Structure Overview

```
mern-portfolio/
├── server/          ← Node.js + Express backend
│   ├── models/      ← Database schemas
│   ├── routes/      ← API endpoints
│   ├── controllers/ ← Business logic
│   └── server.js    ← Main file
│
└── client/          ← React frontend
    ├── src/pages/   ← Page components
    ├── src/components/ ← Reusable components
    └── src/App.jsx  ← Main component
```

---

## 🔑 Key Concepts

### Backend (Node.js + Express)
- **Routes**: Define API endpoints (/api/user, /api/projects, etc.)
- **Controllers**: Handle business logic for each route
- **Models**: Define database schemas (User, Project, Contact)
- **Middleware**: CORS allows frontend to communicate with backend

### Frontend (React)
- **Pages**: Home, About, Projects, Contact
- **Components**: Reusable pieces (Navbar, Footer, ProjectCard)
- **React Router**: Handles navigation between pages
- **Axios**: Makes HTTP requests to backend API
- **Tailwind CSS**: Styles the UI

### Database (MongoDB)
- **Collections**: Users, Projects, Contacts
- **Documents**: Individual records in collections
- **Mongoose**: Library that connects Node.js to MongoDB

---

## 📚 API Endpoints Cheat Sheet

```
GET  /api/user                  → Get your profile
POST /api/user                  → Create/Update profile

GET  /api/projects              → Get all projects
POST /api/projects              → Add new project
PUT  /api/projects/:id          → Update project
DELETE /api/projects/:id        → Delete project

POST /api/contact               → Send message
GET  /api/contact               → Get messages
```

---

## 🎨 Customization Tips

### Change Colors
Edit `client/src/styles/globals.css` and `Tailwind classes in components`

### Update Site Title
Edit `client/public/index.html` - change `<title>`

### Update Your Info
Make POST request to `/api/user` endpoint

### Add More Projects
Make POST request to `/api/projects` endpoint

---

## ❌ Common Errors & Solutions

| Error | Solution |
|-------|----------|
| Port 5000 in use | Change PORT in `.env` to 5001 |
| MongoDB connection failed | Check MongoDB connection string in `.env` |
| CORS error | Make sure backend is running on 5000 |
| Cannot find module | Run `npm install` in the directory |
| React won't start | Make sure port 3000 isn't in use, run `npm start` again |

---

## 📖 File Guide

### `/server/server.js` - Main Backend File
This file:
- Imports all necessary packages
- Sets up Express app
- Configures CORS (allows frontend to connect)
- Connects to MongoDB
- Sets up API routes
- Starts the server on port 5000

### `/client/src/App.jsx` - Main Frontend File
This file:
- Sets up React Router for navigation
- Defines which page appears for each URL
- Renders Navbar on every page
- Renders Footer on every page

### Models (`/server/models/`)
- **User.js**: User profile information
- **Project.js**: Portfolio projects
- **Contact.js**: Contact messages

### Controllers (`/server/controllers/`)
- **userController.js**: Get/update user profile
- **projectController.js**: Manage projects
- **contactController.js**: Handle contact messages

### Pages (`/client/src/pages/`)
- **Home.jsx**: Hero section, skills
- **About.jsx**: Bio, experience, education
- **Projects.jsx**: Display all projects
- **Contact.jsx**: Contact form

---

## 🚀 Deploy Your Portfolio

### Deploy Backend (Heroku)
1. Create Heroku account
2. Create new app
3. Add environment variables
4. Deploy from GitHub

### Deploy Frontend (Vercel)
1. Create Vercel account
2. Import GitHub repo
3. Set environment variables
4. Deploy

### Update Frontend URL
After deploying backend, update `client/.env`:
```
REACT_APP_API_URL=https://your-heroku-app.herokuapp.com
```

---

## 💡 Pro Tips

1. **Test API with Postman** - Download Postman to test API endpoints
2. **Use MongoDB Compass** - Visualize your database locally
3. **Check Browser Console** - F12 for errors
4. **Check Terminal Output** - See server logs and errors
5. **Comment Your Code** - Helps you remember what each part does

---

For more help, see the main [README.md](./README.md)
