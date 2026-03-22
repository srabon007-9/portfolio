# Complete Setup Instructions for MERN Portfolio

Follow these steps **EXACTLY IN ORDER** to set up your MERN portfolio website.

---

## ✅ Prerequisites Checklist

Before you start, make sure you have:

- [ ] **Node.js installed** - Download from https://nodejs.org/ (Choose LTS version)
- [ ] **MongoDB Atlas account** - Create free account at https://www.mongodb.com/cloud/atlas
- [ ] **Terminal/Command Prompt** - Able to run commands
- [ ] **Code Editor** - VS Code recommended (https://code.visualstudio.com/)

### Verify Installation

Open your terminal and run these commands:

```bash
node --version
npm --version
```

Both should show version numbers. If not, install Node.js first.

---

## 🚀 Step 1: MongoDB Setup (CRITICAL!)

**Note:** Do this FIRST before running the application!

### 1.1 Create MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Sign Up"
3. Fill in your details
4. Verify your email
5. Sign in to MongoDB Atlas

### 1.2 Create a Cluster

1. In MongoDB Atlas dashboard, click "Create" → "Create Project"
2. Name your project: `mern-portfolio`
3. Click "Create Project"
4. Click "Create" to create a cluster
5. **IMPORTANT:** Select **Free** tier (M0 Cluster) - it's completely free
6. Choose a region closest to you
7. Click "Create Cluster"
8. **Wait 2-3 minutes for the cluster to be created**

### 1.3 Create Database User

1. In left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" for authentication
4. Username: `portfolio_user`
5. Password: Create a strong password (write it down!)
6. Click "Add User"

### 1.4 Setup Network Access

1. In left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development: Click "Allow access from anywhere"
4. Click "Confirm"

### 1.5 Get Your Connection String

1. Go back to "Clusters" in left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://portfolio_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you created
6. **Save this string - you'll need it in Step 3**

---

## 📁 Step 2: Prepare Project Files

All project files are already created in the `/mern-portfolio` folder.

The structure should be:
```
mern-portfolio/
├── server/          (Backend)
├── client/          (Frontend)
├── README.md
└── QUICK_START.md
```

Verify all these folders exist. If not, extract the project again.

---

## ⚙️ Step 3: Setup Backend

Open terminal and navigate to the server folder:

```bash
cd mern-portfolio/server
```

### 3.1 Create .env File

Create a file named `.env` in the `/server` folder (NOT `.env.example`):

**For Mac/Linux:**
```bash
touch .env
```

**For Windows:**
Use VS Code to create the file, or use Notepad.

### 3.2 Add Configuration to .env

Open `.env` and add these lines:

```
MONGODB_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mern_portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

**IMPORTANT:** Replace:
- `YOUR_PASSWORD` with the password you created for `portfolio_user`
- `cluster0.xxxxx` with your actual cluster name from MongoDB

**Example:**
```
MONGODB_URI=mongodb+srv://portfolio_user:SecurePass123@cluster0.x9k2lm3.mongodb.net/mern_portfolio?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
```

### 3.3 Install Backend Dependencies

Still in `/server` folder, run:

```bash
npm install
```

**This will take 2-3 minutes.** Wait for it to complete.

You should see a message like:
```
added 50 packages in 2m
```

---

## 🎨 Step 4: Setup Frontend

Open a **NEW terminal window** and navigate to the client folder:

```bash
cd mern-portfolio/client
```

### 4.1 Create .env File

Create a file named `.env` in the `/client` folder:

**For Mac/Linux:**
```bash
touch .env
```

**For Windows:**
Use VS Code or Notepad to create the file.

### 4.2 Add Configuration to .env

Open `.env` and add:

```
REACT_APP_API_URL=http://localhost:5000
```

That's it! Just this one line.

### 4.3 Install Frontend Dependencies

In the `/client` folder, run:

```bash
npm install
```

**This will take 3-5 minutes.** Wait for it to complete.

You should see:
```
added 1000+ packages in 5m
```

---

## 🏃 Step 5: Run the Application

**You need 2 terminal windows open for this!**

### Terminal 1: Start Backend

In the first terminal, make sure you're in `/mern-portfolio/server`:

```bash
npm start
```

You should see:
```
✓ MongoDB Connected Successfully

╔════════════════════════════════════════╗
║  MERN Portfolio Backend Running        ║
║  Server: http://localhost:5000        ║
║  API: http://localhost:5000/api       ║
╚════════════════════════════════════════╝
```

**Keep this terminal open!**

### Terminal 2: Start Frontend

In a **NEW terminal**, navigate to `/mern-portfolio/client`:

```bash
npm start
```

This will automatically open your browser to `http://localhost:3000`

You should see your portfolio website!

---

## ✨ Step 6: Test Your Application

### Test Backend API

Open your browser and go to:
```
http://localhost:5000/api/user
```

You should see:
```json
{
  "message": "User profile not found"
}
```

This is correct! It means the backend is working.

### Test Frontend

Your browser should have automatically opened:
```
http://localhost:3000
```

You should see:
- Navigation bar at the top
- Hero section saying "Hello! 👋"
- Buttons for "View My Work" and "Get In Touch"
- Footer at the bottom

If you see all this, **congratulations! Your setup is complete!** 🎉

---

## 📊 Step 7: Add Sample Data (Optional)

Follow [SAMPLE_DATA.md](./SAMPLE_DATA.md) to add projects and profile information.

**Requirements:**
- Backend must be running
- You need Postman (https://www.postman.com/) or use cURL

---

## 🐛 Troubleshooting

### Problem: "Cannot find module 'express'"

**Solution:**
1. Make sure you're in `/server` folder
2. Run `npm install` again
3. Delete `node_modules` folder and run `npm install` fresh

### Problem: MongoDB Connection Error

**Solution:**
1. Check `.env` file has correct `MONGODB_URI`
2. Make sure your MongoDB password doesn't have special characters (or URL-encode them)
3. Check IP address is whitelisted in MongoDB Atlas
4. Verify database user exists in MongoDB Atlas

### Problem: Port 5000 Already in Use

**Solution:**
Change `PORT` in `/server/.env`:
```
PORT=5001
```

Then update `/client/.env`:
```
REACT_APP_API_URL=http://localhost:5001
```

### Problem: "Cannot find localhost:3000"

**Solution:**
1. Make sure you ran `npm start` in the `/client` folder
2. Check both terminals show no errors
3. Try accessing manually: http://localhost:3000

### Problem: Blank Page in Browser

**Solution:**
1. Check browser console (F12) for errors
2. Check terminal for errors
3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Restart both backend and frontend

### Problem: "net::ERR_CONNECTION_REFUSED"

**Solution:**
Backend is not running. Make sure:
1. Terminal 1 shows backend running message
2. Backend is on http://localhost:5000
3. Frontend `.env` has correct `REACT_APP_API_URL`

---

## 📝 Important Files

| File | Purpose |
|------|---------|
| `/server/.env` | Backend configuration (MongoDB connection) |
| `/client/.env` | Frontend configuration (API URL) |
| `/server/server.js` | Main backend file |
| `/client/src/App.jsx` | Main frontend file |

---

## 🔄 Daily Usage

After initial setup, to run your application:

**Terminal 1 (Backend):**
```bash
cd mern-portfolio/server
npm start
```

**Terminal 2 (Frontend):**
```bash
cd mern-portfolio/client
npm start
```

Then visit: http://localhost:3000

---

## 📚 Next Steps

1. Read [README.md](./README.md) for detailed documentation
2. Check [QUICK_START.md](./QUICK_START.md) for quick reference
3. Follow [SAMPLE_DATA.md](./SAMPLE_DATA.md) to add sample projects
4. Customize your portfolio with your own information

---

## ✅ Completion Checklist

- [ ] Node.js installed
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created
- [ ] Database user created
- [ ] MongoDB connection string copied
- [ ] Backend `.env` file created with connection string
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend `.env` file created
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Portfolio website visible in browser

**If all boxes are checked, you're done!** 🎉

---

## 🎓 Learning Tips

1. **Understand the Flow:**
   - Frontend (React) → sends request → Backend (Express) → queries database (MongoDB)

2. **Read Code Comments:**
   - Every file has detailed comments explaining what's happening

3. **Experiment:**
   - Try changing colors in `globals.css`
   - Try modifying text in pages
   - Try adding new routes

4. **Check Errors:**
   - Always look at terminal output
   - Always check browser console (F12)

5. **Keep Learning:**
   - Read official documentation
   - Follow tutorials on YouTube
   - Build your own projects

---

## 🆘 Still Having Issues?

1. **Start Fresh:**
   - Delete `/server/node_modules` and run `npm install`
   - Delete `/client/node_modules` and run `npm install`

2. **Check Ports:**
   - Make sure ports 3000 and 5000 are free
   - Use `lsof -i :5000` (Mac/Linux) to check port 5000

3. **Restart Everything:**
   - Stop both terminal processes (Ctrl+C)
   - Close and reopen terminal
   - Run `npm start` again

4. **Ask for Help:**
   - Read error messages carefully
   - Google the error message
   - Check MongoDB Atlas documentation

---

**You've got this! Happy coding!** 🚀
