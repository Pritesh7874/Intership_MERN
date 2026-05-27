# MERN Products App

A full-stack MERN (MongoDB Atlas + Express + React + Node.js) application with complete CRUD for Products.

---

## Project Structure

```
mern-app/
├── backend/
│   ├── models/
│   │   └── Product.js        ← Mongoose schema
│   ├── routes/
│   │   └── products.js       ← CRUD API routes
│   ├── server.js             ← Express app entry point
│   ├── .env                  ← Your MongoDB Atlas URI goes here
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProductCard.jsx   ← Displays product via props
    │   │   └── ProductForm.jsx   ← Add / Edit modal form
    │   ├── App.jsx               ← Root: fetches API, manages state
    │   ├── main.jsx              ← React entry point
    │   └── index.css             ← Global styles
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## Step 1 — Set up MongoDB Atlas (Free Tier)

1. Go to **https://cloud.mongodb.com** and sign up / log in
2. Click **"Build a Database"** → Choose **M0 Free tier** → Select a region → Click **"Create"**
3. **Create a database user:**
   - Username: e.g. `mernuser`
   - Password: something secure (save it!)
   - Click **"Create User"**
4. **Allow network access:**
   - Click **"Add IP Address"** → **"Allow Access from Anywhere"** (0.0.0.0/0) → Confirm
5. **Get the connection string:**
   - Click **"Connect"** → **"Connect your application"**
   - Select **Driver: Node.js**, Version: **5.5 or later**
   - Copy the connection string — it looks like:
     ```
     mongodb+srv://mernuser:<password>@cluster0.abc12.mongodb.net/?retryWrites=true&w=majority
     ```
6. **Paste it into `backend/.env`:**
   ```
   MONGO_URI=mongodb+srv://mernuser:YourPassword@cluster0.abc12.mongodb.net/mern_products?retryWrites=true&w=majority
   PORT=5000
   ```
   - Replace `<password>` with your actual password
   - Add `/mern_products` before the `?` — this is your database name

---

## Step 2 — Run the Backend

```bash
cd backend
npm install
npm run dev       # uses nodemon for auto-restart
```

You should see:
```
✅  MongoDB Atlas connected
🌱  Seeded 4 sample products into Atlas
🚀  Server running at http://localhost:5000
📦  API available at http://localhost:5000/api/products
```

Test it in your browser: **http://localhost:5000/api/products**

---

## Step 3 — Run the Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

---

## Request Body (POST / PUT)

```json
{
  "name": "Wireless Headphones",
  "price": 2999,
  "description": "Noise-cancelling, 30hr battery",
  "category": "Electronics"
}
```

---

## Skills Covered

- React components, props, useState, useEffect
- axios for HTTP requests (GET, POST, PUT, DELETE)
- Express.js REST API with router
- Mongoose schema design + model
- MongoDB Atlas (cloud database) connection
- dotenv for environment variables
- Vite proxy to avoid CORS in development
