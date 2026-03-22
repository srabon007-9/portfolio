# 🚀 MERN Portfolio Website

A complete, beginner-friendly portfolio website built with the **MERN Stack** (MongoDB, Express, React, Node.js).

This project is perfect for learning full-stack web development as everything is well-commented and structured clearly.

---

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [File Descriptions](#file-descriptions)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

✅ **Responsive Design** - Works on all devices (mobile, tablet, desktop)  
✅ **Modern UI** - Built with Tailwind CSS  
✅ **Dynamic Content** - Fetch data from MongoDB  
✅ **Contact Form** - Send messages that are stored in the database  
✅ **Project Showcase** - Display projects with tech stacks and links  
✅ **User Profile** - Manage your portfolio information  
✅ **Loading States** - Smooth loading indicators  
✅ **Error Handling** - Graceful error messages  
✅ **Animations** - Smooth hover effects and transitions  
✅ **Clean Code** - Well-commented for beginners  

---

## 📁 Project Structure

```
mern-portfolio/
│
├── server/                 # Backend (Node.js + Express)
│   ├── models/            # Database schemas
│   │   ├── User.js
│   │   ├── Project.js
│   │   └── Contact.js
│   ├── routes/            # API routes
│   │   ├── userRoutes.js
│   │   ├── projectRoutes.js
│   │   └── contactRoutes.js
│   ├── controllers/       # Business logic
│   │   ├── userController.js
│   │   ├── projectController.js
│   │   └── contactController.js
│   ├── config/            # Configuration
│   │   └── database.js    # MongoDB connection
│   ├── server.js          # Main server file
│   ├── package.json       # Dependencies
│   └── .env.example       # Environment variables template
│
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── pages/        # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   └── Contact.jsx
│   │   ├── components/   # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── styles/       # CSS files
│   │   │   └── globals.css
│   │   ├── App.jsx       # Main App component
│   │   └── index.js      # React entry point
│   ├── public/
│   │   └── index.html    # HTML template
│   ├── package.json      # Dependencies
│   ├── .env.example      # Environment variables template
│   ├── tailwind.config.js
│   └── postcss.config.js
│
└── README.md             # This file
```

---

## 📋 Prerequisites

Before you begin, make sure you have:

1. **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
2. **npm** (comes with Node.js) - For package management
3. **Git** - [Download](https://git-scm.com/)
4. **MongoDB Account** - [Create free account](https://www.mongodb.com/cloud/atlas)
5. **Code Editor** - VS Code recommended ([Download](https://code.visualstudio.com/))

### Verify Installation

Open your terminal and run:

```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
```

---

## 🛠 Installation & Setup

### Step 1: Clone or Download the Project

```bash
# Clone from Git (if available)
git clone <repository-url>
cd mern-portfolio

# OR if downloaded as zip, extract and navigate:
cd path/to/mern-portfolio
```

### Step 2: Setup Backend

Navigate to the server folder:

```bash
cd server
```

**Install dependencies:**

```bash
npm install
```

**Create .env file:**

```bash
# Copy the example file
cp .env.example .env

# OR create .env manually and add:
# MONGODB_URI=your_mongodb_connection_string_here
# PORT=5000
# NODE_ENV=development
```

### Step 3: Setup Frontend

Open a new terminal and navigate to the client folder:

```bash
cd client
```

**Install dependencies:**

```bash
npm install
```

**Create .env file:**

```bash
# Copy the example file
cp .env.example .env

# OR create .env manually and add:
# REACT_APP_API_URL=http://localhost:5000
```

---

## 🗄 Database Setup

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Sign Up" and create a free account
3. Verify your email

### Step 2: Create a Cluster

1. After login, click "Create" to create a new project
2. Name your project (e.g., "mern-portfolio")
3. Click "Create Project"
4. Click "Create" to create a cluster
5. Select the **Free** tier (M0 Cluster)
6. Choose a region closest to you
7. Click "Create Cluster" (this takes 2-3 minutes)

### Step 3: Create Database User

1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Enter username: `portfolio_user`
5. Enter password: `your_strong_password`
6. Click "Add User"

### Step 4: Whitelist Your IP

1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Select "Allow access from anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String

1. Go back to "Clusters" in the sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string (looks like: `mongodb+srv://...`)

### Step 6: Add Connection String to .env

Replace the placeholder in `/server/.env`:

```env
MONGODB_URI=mongodb+srv://portfolio_user:your_strong_password@cluster0.xxxxx.mongodb.net/mern_portfolio?retryWrites=true&w=majority
```

---

## 🚀 Running the Application

### Terminal Setup

You'll need 3 terminal windows/tabs:
1. One for the backend server
2. One for the frontend development server
3. (Optional) One for monitoring/utilities

### Run Backend

In the first terminal:

```bash
cd server
npm start

# Output should show:
# ╔════════════════════════════════════════╗
# ║  MERN Portfolio Backend Running        ║
# ║  Server: http://localhost:5000        ║
# ╚════════════════════════════════════════╝
```

### Run Frontend

In the second terminal:

```bash
cd client
npm start

# This will automatically open http://localhost:3000 in your browser
```

### Access the Application

Open your browser and go to:

```
http://localhost:3000
```

You should see your portfolio website!

---

## 📡 API Endpoints

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get user profile |
| POST | `/api/user` | Create/Update user profile |

### Project Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Get all projects |
| GET | `/api/projects/:id` | Get specific project |
| POST | `/api/projects` | Create new project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

### Contact Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contact` | Get all messages |
| POST | `/api/contact` | Send new message |
| PATCH | `/api/contact/:id/read` | Mark message as read |
| DELETE | `/api/contact/:id` | Delete message |

---

## 📄 File Descriptions

### Backend Files

**`server/server.js`**
- Main server file
- Sets up Express app and middleware
- Connects to MongoDB
- Defines API routes

**`server/config/database.js`**
- Connects to MongoDB using Mongoose
- Handles connection errors

**`server/models/User.js`**
- Defines User schema
- Fields: name, email, bio, profilePicture

**`server/models/Project.js`**
- Defines Project schema
- Fields: title, description, techStack, githubLink, liveLink, imageUrl

**`server/models/Contact.js`**
- Defines Contact schema
- Fields: name, email, subject, message, isRead

**`server/controllers/`**
- Contains business logic for each route
- Handles database queries
- Sends responses to frontend

**`server/routes/`**
- Defines API endpoints
- Maps routes to controller functions

### Frontend Files

**`client/src/App.jsx`**
- Main React component
- Sets up routing
- Renders pages and navigation

**`client/src/pages/`**
- **Home.jsx** - Landing page with hero section
- **About.jsx** - About page with experience and education
- **Projects.jsx** - Displays all projects from database
- **Contact.jsx** - Contact form that sends to backend

**`client/src/components/`**
- **Navbar.jsx** - Navigation bar with mobile menu
- **Footer.jsx** - Footer with links
- **ProjectCard.jsx** - Individual project display
- **LoadingSpinner.jsx** - Loading indicator

**`client/src/styles/globals.css`**
- Tailwind CSS imports
- Custom animations
- Global styles

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'express'"

**Solution:** Make sure you're in the `server` directory and run:

```bash
npm install
```

### Issue: "MongoDB connection failed"

**Solution:**
1. Check your `.env` file has the correct `MONGODB_URI`
2. Make sure your IP address is whitelisted in MongoDB Atlas
3. Verify your username and password are correct
4. Check your internet connection

### Issue: "CORS error in browser console"

**Solution:**
The backend might not be running. Make sure:
1. Backend is running on `http://localhost:5000`
2. Frontend `.env` has correct `REACT_APP_API_URL`

### Issue: "Port 5000 already in use"

**Solution:** Change the port in `.env`:

```env
PORT=5001
```

Then update frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5001
```

### Issue: "React app not loading"

**Solution:**
1. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
2. Restart the frontend server
3. Make sure you're on `http://localhost:3000`

### Issue: "Build errors with Tailwind CSS"

**Solution:**
This is normal. The CSS warnings won't affect functionality. Your app should still work fine in the browser.

---

## 💾 Adding Sample Data

### Through API (Postman or similar)

**Create User Profile:**

```bash
POST http://localhost:5000/api/user
Content-Type: application/json

{
  "name": "Your Name",
  "email": "your.email@example.com",
  "bio": "Full-stack developer passionate about building amazing web applications.",
  "profilePicture": "https://example.com/image.jpg"
}
```

**Create Project:**

```bash
POST http://localhost:5000/api/projects
Content-Type: application/json

{
  "title": "E-Commerce Platform",
  "description": "A full-stack e-commerce platform with payment integration",
  "techStack": ["React", "Node.js", "MongoDB", "Stripe"],
  "githubLink": "https://github.com/yourusername/project",
  "liveLink": "https://project-demo.com",
  "imageUrl": "https://example.com/project.jpg"
}
```

---

## 📚 Learning Resources

- **MongoDB**: https://docs.mongodb.com/
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **Node.js**: https://nodejs.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs

---

## 🎯 Next Steps

After setting up successfully, try:

1. **Customize Your Data** - Update user profile with your information
2. **Add Your Projects** - Add real projects via API
3. **Customize Styling** - Modify colors and layout in `globals.css`
4. **Add Authentication** - Secure API routes with login
5. **Deploy** - Deploy to Heroku, Vercel, or similar

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🤝 Support

If you have questions or issues:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review code comments in files
3. Check browser console for errors (F12)
4. Check terminal output for errors

---

## 🎉 Congratulations!

You've successfully set up a complete MERN stack portfolio website! 

Happy coding! 🚀
