// App.jsx
// Root component — fetches data from Express API using axios
// Manages all CRUD operations and passes data down via props

import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import ProductForm from "./components/ProductForm";

// Base URL for the API
// During dev, Vite proxies /api → http://localhost:5000
const API = "/api/products";

function App() {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [showForm, setShowForm]   = useState(false);
  const [editProduct, setEdit]    = useState(null);
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("");
  const [toast, setToast]         = useState(null);

  // ── Fetch all products from backend on mount ───────────────
  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(API);  // GET /api/products
      setProducts(res.data);
    } catch (err) {
      setError(
        err.response?.data?.error ||
        "Cannot connect to server. Make sure the backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  }

  // ── Create ─────────────────────────────────────────────────
  async function handleCreate(formData) {
    try {
      const res = await axios.post(API, formData);  // POST /api/products
      setProducts(prev => [res.data, ...prev]);
      showToast("Product created ✓");
      setShowForm(false);
    } catch (err) {
      showToast(err.response?.data?.error || "Create failed", "error");
    }
  }

  // ── Update ─────────────────────────────────────────────────
  async function handleUpdate(formData) {
    try {
      const res = await axios.put(`${API}/${editProduct._id}`, formData);  // PUT /api/products/:id
      setProducts(prev => prev.map(p => p._id === editProduct._id ? res.data : p));
      showToast("Product updated ✓");
      setEdit(null);
    } catch (err) {
      showToast(err.response?.data?.error || "Update failed", "error");
    }
  }

  // ── Delete ─────────────────────────────────────────────────
  async function handleDelete(id) {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`${API}/${id}`);  // DELETE /api/products/:id
      setProducts(prev => prev.filter(p => p._id !== id));
      showToast("Product deleted");
    } catch (err) {
      showToast(err.response?.data?.error || "Delete failed", "error");
    }
  }

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  // ── Filter ─────────────────────────────────────────────────
  const categories = [...new Set(products.map(p => p.category))].sort();
  const filtered = products.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = !category || p.category === category;
    return matchSearch && matchCat;
  });

  const avgPrice = products.length
    ? Math.round(products.reduce((s, p) => s + p.price, 0) / products.length)
    : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f6f3" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Header ── */}
      <header style={{
        background: "#fff",
        borderBottom: "1.5px solid #e4e0d8",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "30px", height: "30px", background: "#2563eb", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontSize: "16px" }}>📦</span>
            </div>
            <span style={{ fontWeight: "600", fontSize: "16px" }}>MERN Products</span>
            <span style={{ fontSize: "11px", background: "#f0fdf4", color: "#16a34a", padding: "2px 8px", borderRadius: "20px", fontWeight: "500" }}>
              Atlas Connected
            </span>
          </div>
          <button
            onClick={() => { setEdit(null); setShowForm(true); }}
            style={{ background: "#2563eb", color: "#fff", padding: "9px 18px", borderRadius: "8px", fontSize: "14px", fontWeight: "500" }}
            onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
            onMouseLeave={e => e.currentTarget.style.background = "#2563eb"}
          >
            + Add Product
          </button>
        </div>
      </header>

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "28px 24px" }}>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
          {[
            { label: "Total Products", value: products.length },
            { label: "Avg Price", value: `₹${avgPrice.toLocaleString("en-IN")}` },
            { label: "Categories", value: categories.length },
          ].map((s, i) => (
            <div key={i} style={{ background: "#fff", border: "1.5px solid #e4e0d8", borderRadius: "10px", padding: "16px 20px" }}>
              <p style={{ fontSize: "12px", color: "#7a766e", marginBottom: "4px" }}>{s.label}</p>
              <p style={{ fontSize: "24px", fontWeight: "600", fontFamily: "DM Mono, monospace" }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Toolbar ── */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: "1", minWidth: "200px", maxWidth: "360px" }}
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ width: "auto", minWidth: "160px" }}
          >
            <option value="">All categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button
            onClick={fetchProducts}
            style={{ background: "#f0ede8", color: "#1a1916", padding: "9px 14px", borderRadius: "8px", fontSize: "13px" }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* ── States ── */}
        {loading && (
          <div style={{ textAlign: "center", padding: "60px", color: "#7a766e" }}>
            <p style={{ fontSize: "15px" }}>Fetching from MongoDB Atlas…</p>
          </div>
        )}

        {error && (
          <div style={{ background: "#fef2f2", border: "1.5px solid #fecaca", borderRadius: "10px", padding: "20px", color: "#dc2626", fontSize: "14px" }}>
            <strong>Connection error:</strong> {error}
            <br />
            <button
              onClick={fetchProducts}
              style={{ marginTop: "10px", background: "#dc2626", color: "#fff", padding: "7px 14px", borderRadius: "6px", fontSize: "13px" }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ── Product Grid ── */}
        {!loading && !error && (
          <>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px", color: "#7a766e" }}>
                <p style={{ fontSize: "32px", marginBottom: "8px" }}>📭</p>
                <p>{search || category ? "No products match your filter." : "No products yet. Add one!"}</p>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "16px",
              }}>
                {filtered.map((product, i) => (
                  <div key={product._id} style={{ animationDelay: `${i * 0.04}s` }}>
                    <ProductCard
                      product={product}
                      onEdit={(p) => { setEdit(p); setShowForm(true); }}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Form Modal ── */}
      {showForm && (
        <ProductForm
          product={editProduct}
          onSubmit={editProduct ? handleUpdate : handleCreate}
          onClose={() => { setShowForm(false); setEdit(null); }}
        />
      )}

      {/* ── Toast Notification ── */}
      {toast && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          background: toast.type === "error" ? "#dc2626" : "#16a34a",
          color: "#fff",
          padding: "12px 18px",
          borderRadius: "8px",
          fontSize: "13px",
          fontWeight: "500",
          animation: "slideUp 0.2s ease both",
          zIndex: 2000,
        }}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}

export default App;
