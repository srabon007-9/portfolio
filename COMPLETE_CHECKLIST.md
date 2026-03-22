# 🎯 MERN Portfolio - Complete Checklist & Setup Guide

## ✅ Pre-Setup Checklist

Before starting, verify you have everything:

### System Requirements
- [ ] **Operating System:** Windows, Mac, or Linux
- [ ] **RAM:** At least 4GB free
- [ ] **Disk Space:** At least 2GB free
- [ ] **Internet:** Required for MongoDB Atlas

### Software Installation
- [ ] **Node.js:** Version 14+ installed
  - Verify: `node --version`
  - Download: https://nodejs.org/
- [ ] **npm:** Installed with Node.js
  - Verify: `npm --version`
- [ ] **Code Editor:** Installed (VS Code recommended)
  - Download: https://code.visualstudio.com/
- [ ] **Git:** Optional but recommended
  - Download: https://git-scm.com/

### Accounts & Services
- [ ] **MongoDB Atlas:** Free account created
  - Sign up: https://www.mongodb.com/cloud/atlas
  - Plan: Free tier (M0 Cluster)
- [ ] **MongoDB Cluster:** Created
  - Region: Chosen (closest to you)
  - Wait: 2-3 minutes for cluster creation
- [ ] **Database User:** Created
  - Username: `portfolio_user`
  - Password: Written down securely
- [ ] **Network Access:** Configured
  - IP: Allow access from anywhere (for development)
- [ ] **Connection String:** Obtained
  - Format: `mongodb+srv://...`
  - Password: Replaced in connection string

### Project Files
- [ ] **mern-portfolio folder:** Exists
  - Location: `/Users/srabonahmed/Programming/CSE 221/Lab 6/mern-portfolio/`
- [ ] **server folder:** Exists
  - Contains: package.json, server.js, models/, routes/, controllers/, config/
- [ ] **client folder:** Exists
  - Contains: src/, public/, package.json, tailwind.config.js

---

## 🔧 Step-by-Step Setup

### Phase 1: Backend Setup (15 minutes)

#### Step 1.1: Navigate to Server
```bash
cd /Users/srabonahmed/Programming/CSE\ 221/Lab\ 6/mern-portfolio/server
```
- [ ] Terminal shows you're in `/server` folder

#### Step 1.2: Create .env File
- [ ] Create new file named `.env` in `/server`
- [ ] Copy this content:
```env
MONGODB_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/mern_portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```
- [ ] Replace `YOUR_PASSWORD` with your actual password
- [ ] Replace `YOUR_CLUSTER` with your cluster name
- [ ] File saved: `/server/.env`

#### Step 1.3: Verify .env
- [ ] Open `.env` file in editor
- [ ] Contains: MONGODB_URI, PORT, NODE_ENV
- [ ] No quotes around values
- [ ] No special characters not escaped

#### Step 1.4: Install Dependencies
```bash
npm install
```
- [ ] Terminal shows: `added XXX packages in Xm`
- [ ] Folder created: `/server/node_modules/`
- [ ] No errors in terminal

#### Step 1.5: Test Backend
```bash
npm start
```
- [ ] Terminal shows success message:
  - "✓ MongoDB Connected Successfully"
  - "MERN Portfolio Backend is Running"
- [ ] Server URL: http://localhost:5000
- [ ] Keep this terminal open!

---

### Phase 2: Frontend Setup (15 minutes)

#### Step 2.1: Open New Terminal
- [ ] Open a NEW terminal window/tab
- [ ] **Do NOT close the first terminal**

#### Step 2.2: Navigate to Client
```bash
cd /Users/srabonahmed/Programming/CSE\ 221/Lab\ 6/mern-portfolio/client
```
- [ ] Terminal shows you're in `/client` folder

#### Step 2.3: Create .env File
- [ ] Create new file named `.env` in `/client`
- [ ] Copy this content:
```env
REACT_APP_API_URL=http://localhost:5000
```
- [ ] File saved: `/client/.env`

#### Step 2.4: Install Dependencies
```bash
npm install
```
- [ ] Terminal shows: `added 1000+ packages in Xm`
- [ ] Folder created: `/client/node_modules/`
- [ ] No errors in terminal (warnings are OK)

#### Step 2.5: Start Frontend
```bash
npm start
```
- [ ] Browser automatically opens to: http://localhost:3000
- [ ] You should see your portfolio website
- [ ] Keep this terminal open!

---

## ✨ Verification Phase

### Check Backend is Running

#### Terminal 1 Check
- [ ] Terminal 1 shows "MongoDB Connected Successfully"
- [ ] No error messages
- [ ] Shows "MERN Portfolio Backend is Running"

#### API Endpoint Check
1. Open browser to: `http://localhost:5000/api/user`
2. Should see:
   ```json
   {"message":"User profile not found"}
   ```
3. This means backend is working!

- [ ] API responds with JSON
- [ ] No connection errors

### Check Frontend is Running

#### Browser Check
1. Browser shows: http://localhost:3000
2. You should see:
   - Navigation bar with links (Home, About, Projects, Contact)
   - Hero section saying "Hello! 👋"
   - Two buttons: "View My Work" and "Get In Touch"
   - Footer with links
   - Responsive design (works on mobile too)

- [ ] Page loads without errors
- [ ] Can click navigation links
- [ ] All text visible
- [ ] Colors and styling applied

#### Console Check
1. Press F12 in browser
2. Click "Console" tab
3. Should see minimal messages, NO red errors

- [ ] No red error messages
- [ ] No warnings about API connection

### Test Page Navigation

1. Click "Home" link
   - [ ] Stays on home page
   - [ ] Loads user data

2. Click "About" link
   - [ ] About page loads
   - [ ] Shows bio, experience, education

3. Click "Projects" link
   - [ ] Projects page loads
   - [ ] Shows "No projects found" (expected)

4. Click "Contact" link
   - [ ] Contact page loads
   - [ ] Form visible with fields

---

## 🐛 Troubleshooting Phase

### Issue: Backend Won't Start

**Error:** `Cannot find module 'express'`
- [ ] You're in `/server` folder
- [ ] Delete `node_modules` folder
- [ ] Run `npm install` again
- [ ] Run `npm start` again

**Error:** `MONGODB_URI is required`
- [ ] Check `.env` file exists
- [ ] Check MONGODB_URI is set
- [ ] Check no typos in connection string
- [ ] Check password has no special characters

**Error:** `connect ECONNREFUSED 127.0.0.1:27017`
- [ ] MongoDB Atlas might not be responding
- [ ] Check internet connection
- [ ] Try visiting MongoDB Atlas website
- [ ] Wait a few seconds and try again

### Issue: Frontend Won't Start

**Error:** `Port 3000 is already in use`
- [ ] Close other apps using port 3000
- [ ] Or change port: Run `PORT=3001 npm start`

**Error:** `Cannot find module 'react'`
- [ ] You're in `/client` folder
- [ ] Delete `node_modules` folder
- [ ] Run `npm install` again
- [ ] Run `npm start` again

**Error:** Blank page in browser
- [ ] Press F12 to check console
- [ ] Hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
- [ ] Check Terminal 2 for errors
- [ ] Make sure Backend Terminal 1 is running

### Issue: Connection Between Frontend and Backend

**Error:** `Network Error` in browser console
- [ ] Check Backend Terminal 1 is running
- [ ] Check `.env` in `/client` has correct URL
- [ ] Check firewall isn't blocking port 5000

**Fix:**
- [ ] Make sure Terminal 1 shows backend running
- [ ] Check firewall settings
- [ ] Try: `http://localhost:5000` in new browser tab
- [ ] Restart both servers

---

## 📊 Final Verification Checklist

### Terminal 1 (Backend)

When you run `npm start` in `/server`, you should see:
```
✓ MongoDB Connected Successfully

╔════════════════════════════════════════╗
║  MERN Portfolio Backend Running        ║
║  Server: http://localhost:5000        ║
║  API: http://localhost:5000/api       ║
╚════════════════════════════════════════╝
```

- [ ] This exact message appears
- [ ] No error messages below it
- [ ] Terminal stays open (doesn't exit)

### Terminal 2 (Frontend)

When you run `npm start` in `/client`, you should see:
```
Compiled successfully!

You can now view mern-portfolio-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

- [ ] Message shows "Compiled successfully!"
- [ ] Browser opens to localhost:3000
- [ ] No errors shown

### Browser Display

You should see a website with:
- [ ] Dark theme (dark blue/gray background)
- [ ] White text
- [ ] Navigation bar at top with: Home, About, Projects, Contact
- [ ] Hero section with "Hello! 👋"
- [ ] Your Name (or placeholder)
- [ ] Buttons for navigation
- [ ] Footer at bottom
- [ ] Responsive design (try resizing browser)

---

## 🎓 Next Steps After Success

### If Everything Works ✅

Congratulations! Your MERN stack is ready!

**Next:**
1. Read [SAMPLE_DATA.md](./SAMPLE_DATA.md) to add sample projects
2. Read [README.md](./README.md) for full documentation
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the system
4. Customize the portfolio with your own information

### Add Sample Data

1. Download [Postman](https://www.postman.com/) (free)
2. Follow [SAMPLE_DATA.md](./SAMPLE_DATA.md) instructions
3. Add sample projects to database
4. See them appear on your Projects page!

### Customize Your Portfolio

**Change Colors:**
- Edit `/client/src/styles/globals.css`

**Update Content:**
- Edit `/client/src/pages/Home.jsx`, `About.jsx`, etc.

**Add Your Info:**
- Use Postman to POST to `/api/user`
- See it appear on your site!

---

## 🚀 Daily Usage (After Setup)

Every time you want to work on your portfolio:

### Terminal 1
```bash
cd /Users/srabonahmed/Programming/CSE\ 221/Lab\ 6/mern-portfolio/server
npm start
```
- [ ] Wait for "Backend Running" message
- [ ] Leave terminal open

### Terminal 2
```bash
cd /Users/srabonahmed/Programming/CSE\ 221/Lab\ 6/mern-portfolio/client
npm start
```
- [ ] Wait for "Compiled successfully" message
- [ ] Browser opens automatically
- [ ] Start editing!

### To Stop
- Terminal 1: Press `Ctrl+C`
- Terminal 2: Press `Ctrl+C`

---

## 📝 Important Notes

### About .env Files
- ❌ Never commit `.env` to Git
- ❌ Never share your `.env` file
- ❌ Never push `.env` to GitHub
- ✅ Only share `.env.example` with placeholders

### About Passwords
- ✅ Use strong password for MongoDB
- ❌ Never use simple passwords like "123456"
- ✅ Write password down in secure location
- ❌ Don't share your MongoDB password

### About Ports
- Port 5000: Backend server (Express)
- Port 3000: Frontend server (React)
- Make sure these ports are free!

### About Browser Cache
If something looks wrong:
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Or: Open DevTools (F12) → Settings → "Disable cache"

---

## ✅ Final Checklist - Are You Ready?

- [ ] All prerequisites installed (Node.js, npm)
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and running
- [ ] Database user created
- [ ] Connection string obtained
- [ ] Backend `.env` file created with MongoDB URI
- [ ] Backend `npm install` completed
- [ ] Backend `npm start` shows success
- [ ] Frontend `.env` file created
- [ ] Frontend `npm install` completed
- [ ] Frontend `npm start` shows success
- [ ] Browser shows portfolio at localhost:3000
- [ ] No errors in browser console (F12)
- [ ] All navigation links work
- [ ] API endpoint responds (http://localhost:5000/api/user)

**If all checked: You're DONE!** 🎉

---

## 📞 Quick Reference

### Common Commands

```bash
# Start backend
cd server && npm start

# Start frontend
cd client && npm start

# Install dependencies
npm install

# Stop server
Ctrl+C

# Check if port is used
lsof -i :5000          # Mac/Linux
netstat -ano | findstr :5000  # Windows

# Clear npm cache
npm cache clean --force

# Reinstall everything fresh
rm -rf node_modules && npm install
```

### URLs

```
Frontend:    http://localhost:3000
Backend:     http://localhost:5000
API Base:    http://localhost:5000/api

Test User:   http://localhost:5000/api/user
All Projects: http://localhost:5000/api/projects
```

---

## 🎯 Success Indicators

Your setup is **COMPLETE** when you see:

✅ Backend terminal shows: "MERN Portfolio Backend is Running"  
✅ Frontend browser shows: Portfolio website  
✅ Browser console has: NO red errors  
✅ Navigation works: Can click all menu items  
✅ API responds: `/api/user` returns JSON  

---

## 🎉 You Made It!

If you're reading this and everything is checked, **CONGRATULATIONS!**

You now have a complete MERN stack portfolio website running on your computer! 🚀

**Next:** Read INDEX.md for your next steps, or start customizing!

---

**Helpful Resources:**
- MongoDB Docs: https://docs.mongodb.com/
- Express Docs: https://expressjs.com/
- React Docs: https://react.dev/
- Node.js Docs: https://nodejs.org/

**Happy Coding!** 💻✨
