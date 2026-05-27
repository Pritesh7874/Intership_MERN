require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/products");
const Product = require("./models/Product");

const app = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── MongoDB Atlas Connection ────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI || MONGO_URI.includes("<username>")) {
  console.error("❌  ERROR: Please set your MONGO_URI in the .env file.");
  console.error("   Open backend/.env and paste your MongoDB Atlas connection string.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("✅  MongoDB Atlas connected");

    // Seed data if collection is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany([
        {
          name: "Wireless Headphones",
          price: 2999,
          description: "Noise-cancelling, 30hr battery life",
          category: "Electronics",
        },
        {
          name: "Mechanical Keyboard",
          price: 4499,
          description: "RGB backlit, tactile switches",
          category: "Electronics",
        },
        {
          name: "Leather Wallet",
          price: 899,
          description: "Slim bifold, genuine leather",
          category: "Accessories",
        },
        {
          name: "Running Shoes",
          price: 3299,
          description: "Lightweight, breathable mesh upper",
          category: "Footwear",
        },
      ]);
      console.log("🌱  Seeded 4 sample products into Atlas");
    }
  })
  .catch((err) => {
    console.error("❌  MongoDB connection failed:", err.message);
    process.exit(1);
  });

// ── Routes ──────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "MERN Products API is running 🚀" });
});

app.use("/api/products", productRoutes);

// ── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ── Start Server ────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server running at http://localhost:${PORT}`);
  console.log(`📦  API available at http://localhost:${PORT}/api/products`);
});
