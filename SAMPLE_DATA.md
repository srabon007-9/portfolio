# Sample Data for MERN Portfolio

Use this document to add sample data to your portfolio using API requests.

## Using Postman or cURL

### 1. Create a User Profile

**POST** `http://localhost:5000/api/user`

```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "bio": "Full-stack developer passionate about creating beautiful and functional web applications. Love learning new technologies and sharing knowledge with the community.",
  "profilePicture": "https://i.pravatar.cc/150?img=12"
}
```

---

### 2. Add Sample Projects

**POST** `http://localhost:5000/api/projects`

#### Project 1: E-Commerce Platform

```json
{
  "title": "E-Commerce Platform",
  "description": "A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and admin dashboard. Built with MERN stack.",
  "techStack": ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
  "githubLink": "https://github.com/yourusername/ecommerce-platform",
  "liveLink": "https://ecommerce-demo.example.com",
  "imageUrl": "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop"
}
```

#### Project 2: Task Management App

```json
{
  "title": "Task Management App",
  "description": "A beautiful and intuitive task management application with real-time updates, collaborative features, and multiple workspace support.",
  "techStack": ["React", "Firebase", "Tailwind CSS", "Redux"],
  "githubLink": "https://github.com/yourusername/task-manager",
  "liveLink": "https://task-manager-demo.example.com",
  "imageUrl": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop"
}
```

#### Project 3: Social Media Dashboard

```json
{
  "title": "Social Media Dashboard",
  "description": "Monitor and manage multiple social media accounts from a single dashboard. Track metrics, schedule posts, and analyze engagement.",
  "techStack": ["React", "Node.js", "PostgreSQL", "Chart.js"],
  "githubLink": "https://github.com/yourusername/social-dashboard",
  "liveLink": "https://social-dashboard-demo.example.com",
  "imageUrl": "https://images.unsplash.com/photo-1611605698323-8d5d159d4d0f?w=500&h=300&fit=crop"
}
```

#### Project 4: Blog Platform

```json
{
  "title": "Blog Platform",
  "description": "A modern blogging platform with markdown support, SEO optimization, comments system, and social sharing capabilities.",
  "techStack": ["React", "Node.js", "MongoDB", "Express"],
  "githubLink": "https://github.com/yourusername/blog-platform",
  "liveLink": "https://blog-platform-demo.example.com",
  "imageUrl": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&h=300&fit=crop"
}
```

#### Project 5: Weather App

```json
{
  "title": "Weather App",
  "description": "Real-time weather application with detailed forecasts, multiple locations, and beautiful animations. Uses OpenWeather API.",
  "techStack": ["React", "OpenWeather API", "Tailwind CSS"],
  "githubLink": "https://github.com/yourusername/weather-app",
  "imageUrl": "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=500&h=300&fit=crop"
}
```

#### Project 6: Fitness Tracker

```json
{
  "title": "Fitness Tracker",
  "description": "Track your workouts, monitor progress, and reach your fitness goals. Features include exercise logging, calorie tracking, and progress charts.",
  "techStack": ["React", "Node.js", "MongoDB", "Chart.js"],
  "githubLink": "https://github.com/yourusername/fitness-tracker",
  "liveLink": "https://fitness-tracker-demo.example.com",
  "imageUrl": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop"
}
```

---

### 3. Sample Contact Messages

These are just for testing - users will send these via the contact form.

**POST** `http://localhost:5000/api/contact`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration Opportunity",
  "message": "Hi Alex! I'm impressed with your portfolio. I'd like to discuss a potential project collaboration. Let's connect!"
}
```

---

## How to Add This Data

### Option 1: Using Postman (Recommended)

1. Download [Postman](https://www.postman.com/downloads/)
2. Create new requests for each endpoint
3. Set method to `POST`
4. Set URL to `http://localhost:5000/api/user` (or `/api/projects`, `/api/contact`)
5. Go to "Body" tab
6. Select "raw" and "JSON"
7. Paste the JSON data
8. Click "Send"

### Option 2: Using cURL (Command Line)

```bash
# Create user profile
curl -X POST http://localhost:5000/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Johnson",
    "email": "alex@example.com",
    "bio": "Full-stack developer..."
  }'

# Create project
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My Project",
    ...
  }'
```

### Option 3: Using Frontend (When UI is Built)

Use the contact form on the Contact page to send messages.

---

## Verifying Data

### Check if Data was Saved

**GET** `http://localhost:5000/api/user` - Should return user profile

**GET** `http://localhost:5000/api/projects` - Should return all projects

**GET** `http://localhost:5000/api/contact` - Should return contact messages

---

## Image Sources

All sample images are from [Unsplash](https://unsplash.com/) - free high-quality images.

Feel free to:
- Use your own image URLs
- Replace with other Unsplash images
- Upload images to services like Cloudinary or AWS S3

---

## Tips

- Replace "yourusername" with your actual GitHub username
- Replace example.com with your actual domain (when deployed)
- Customize descriptions to match your actual projects
- Update tech stacks to match your skills
- Add more projects as you build them

---

For more information on API endpoints, see the main [README.md](./README.md)
