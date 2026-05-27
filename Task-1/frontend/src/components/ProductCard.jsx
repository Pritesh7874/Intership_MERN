// ProductCard.jsx
// Receives product data via props and displays it
// This is the core component from the task spec

function ProductCard({ product, onEdit, onDelete }) {
  const { _id, name, price, description, category } = product;

  const categoryColors = {
    Electronics: { bg: "#eff6ff", text: "#1d4ed8" },
    Accessories:  { bg: "#fdf4ff", text: "#7e22ce" },
    Footwear:     { bg: "#fff7ed", text: "#c2410c" },
    Home:         { bg: "#f0fdf4", text: "#15803d" },
    General:      { bg: "#f8fafc", text: "#475569" },
  };

  const colors = categoryColors[category] || categoryColors.General;

  return (
    <div style={{
      background: "#fff",
      border: "1.5px solid #e4e0d8",
      borderRadius: "12px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.2s, transform 0.2s",
      animation: "fadeUp 0.3s ease both",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)";
      e.currentTarget.style.transform = "translateY(-2px)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
    >
      {/* Category badge */}
      <span style={{
        display: "inline-block",
        alignSelf: "flex-start",
        background: colors.bg,
        color: colors.text,
        fontSize: "11px",
        fontWeight: "600",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        padding: "3px 8px",
        borderRadius: "4px",
      }}>
        {category}
      </span>

      {/* Product name */}
      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1a1916", lineHeight: 1.3 }}>
        {name}
      </h3>

      {/* Description */}
      <p style={{ fontSize: "13px", color: "#7a766e", lineHeight: 1.6, flex: 1 }}>
        {description || "No description provided."}
      </p>

      {/* Price */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
        <span style={{ fontSize: "11px", color: "#7a766e", fontFamily: "DM Mono, monospace" }}>₹</span>
        <span style={{ fontSize: "22px", fontWeight: "600", color: "#1a1916", fontFamily: "DM Mono, monospace" }}>
          {price.toLocaleString("en-IN")}
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
        <button
          onClick={() => onEdit(product)}
          style={{
            flex: 1,
            background: "#f0ede8",
            color: "#1a1916",
            fontSize: "13px",
            padding: "8px",
            borderRadius: "6px",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#e4e0d8"}
          onMouseLeave={e => e.currentTarget.style.background = "#f0ede8"}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(_id)}
          style={{
            background: "#fef2f2",
            color: "#dc2626",
            fontSize: "13px",
            padding: "8px 14px",
            borderRadius: "6px",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#fee2e2"}
          onMouseLeave={e => e.currentTarget.style.background = "#fef2f2"}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
