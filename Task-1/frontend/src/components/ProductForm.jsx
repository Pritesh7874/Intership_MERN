// ProductForm.jsx
// Modal form for adding or editing a product
// Uses controlled inputs and passes data up via onSubmit prop

import { useState, useEffect } from "react";

const CATEGORIES = ["Electronics", "Accessories", "Footwear", "Home", "General"];

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.35)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
  backdropFilter: "blur(2px)",
};

const modal = {
  background: "#fff",
  borderRadius: "14px",
  padding: "28px",
  width: "100%",
  maxWidth: "420px",
  margin: "0 16px",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  animation: "scaleIn 0.2s ease both",
};

function ProductForm({ product, onSubmit, onClose }) {
  const isEditing = Boolean(product?._id);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "Electronics",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Populate form when editing
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "Electronics",
      });
    }
  }, [product]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.price || isNaN(form.price) || Number(form.price) < 0)
      e.price = "Enter a valid price";
    return e;
  }

  async function handleSubmit() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await onSubmit({ ...form, price: Number(form.price) });
    setLoading(false);
  }

  function handleChange(field, value) {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: "" }));
  }

  return (
    <div style={overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={modal}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "17px", fontWeight: "600" }}>
            {isEditing ? "Edit product" : "Add product"}
          </h2>
          <button
            onClick={onClose}
            style={{ background: "#f0ede8", color: "#7a766e", padding: "6px 10px", borderRadius: "6px", fontSize: "16px" }}
          >
            ✕
          </button>
        </div>

        {/* Name */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#7a766e", marginBottom: "5px" }}>
            Product name *
          </label>
          <input
            type="text"
            value={form.name}
            onChange={e => handleChange("name", e.target.value)}
            placeholder="e.g. Wireless Headphones"
          />
          {errors.name && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
        </div>

        {/* Price */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#7a766e", marginBottom: "5px" }}>
            Price (₹) *
          </label>
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={e => handleChange("price", e.target.value)}
            placeholder="e.g. 2999"
          />
          {errors.price && <p style={{ color: "#dc2626", fontSize: "12px", marginTop: "4px" }}>{errors.price}</p>}
        </div>

        {/* Description */}
        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#7a766e", marginBottom: "5px" }}>
            Description
          </label>
          <input
            type="text"
            value={form.description}
            onChange={e => handleChange("description", e.target.value)}
            placeholder="Short product description"
          />
        </div>

        {/* Category */}
        <div style={{ marginBottom: "22px" }}>
          <label style={{ display: "block", fontSize: "12px", fontWeight: "500", color: "#7a766e", marginBottom: "5px" }}>
            Category
          </label>
          <select
            value={form.category}
            onChange={e => handleChange("category", e.target.value)}
          >
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{ background: "#f0ede8", color: "#1a1916", padding: "10px 20px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ background: "#2563eb", color: "#fff", padding: "10px 20px", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Saving…" : isEditing ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
