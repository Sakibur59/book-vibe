import {useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ── Custom Tooltip ─────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const book = payload[0].payload;
    return (
      <div
        style={{
          background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)",
          border: "1px solid #6366f1",
          borderRadius: "12px",
          padding: "12px 16px",
          boxShadow: "0 8px 32px rgba(99,102,241,0.3)",
          minWidth: "180px",
        }}
      >
        <p
          style={{
            color: "#c7d2fe",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "4px",
          }}
        >
          {book.bookName}
        </p>
        <p
          style={{
            color: "#a5b4fc",
            fontSize: "11px",
            marginBottom: "8px",
          }}
        >
          by {book.author}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#818cf8", fontSize: "11px" }}>📖 Pages:</span>
          <span
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: "20px",
              fontFamily: "'Georgia', serif",
            }}
          >
            {book.totalPages}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

// ── Gradient bar colors ────────────────────────────────────────────────────
const BAR_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#a78bfa",
  "#818cf8",
  "#7c3aed",
  "#5b21b6",
  "#4f46e5",
  "#6d28d9",
];

// ── Custom X-Axis tick (truncated book title) ──────────────────────────────
const CustomXTick = ({ x, y, payload }) => {
  const maxLen = 10;
  const label =
    payload.value.length > maxLen
      ? payload.value.slice(0, maxLen) + "…"
      : payload.value;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        transform="rotate(-35)"
        fill="#94a3b8"
        fontSize={11}
        fontWeight={500}
      >
        {label}
      </text>
    </g>
  );
};

// ── Main Component ─────────────────────────────────────────────────────────
const PagesToRead = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // Load from public/booksData.js  (window.booksData) or fetch JSON
    const loadBooks = async () => {
      try {
        // Try fetching bookData.json (common naming in this type of project)
        const res = await fetch("/booksData.json");
        if (res.ok) {
          const data = await res.json();
          setBooks(Array.isArray(data) ? data : data.books || []);
        } else {
          // Fallback: try booksData.js exported as window.booksData
          if (window.booksData) {
            setBooks(window.booksData);
          } else {
            // Demo data so the chart is never empty
            setBooks(DEMO_BOOKS);
          }
        }
      } catch {
        setBooks(window.booksData || DEMO_BOOKS);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, []);

  // chart data: each entry = { bookName, author, totalPages }
  const chartData = books.map((b) => ({
    bookName: b.bookName || b.name || b.title || "Unknown",
    author: b.author || b.authorName || "—",
    totalPages: Number(b.totalPages || b.pages || 0),
  }));

  const totalPagesAll = chartData.reduce((s, b) => s + b.totalPages, 0);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0f0c29 0%, #1a1040 50%, #0d1117 100%)",
        padding: "40px 24px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      {/* ── Header ── */}
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <p
            style={{
              color: "#6366f1",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            Reading Dashboard
          </p>
          <h1
            style={{
              color: "#fff",
              fontSize: "clamp(28px, 5vw, 48px)",
              fontWeight: 800,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Pages to Read
          </h1>
          <p style={{ color: "#64748b", marginTop: "12px", fontSize: "15px" }}>
            A visual breakdown of your reading list by page count
          </p>
        </div>

        {/* ── Stats row ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          {[
            { label: "Total Books", value: books.length, icon: "📚" },
            { label: "Total Pages", value: totalPagesAll.toLocaleString(), icon: "📄" },
            {
              label: "Avg Pages",
              value: books.length
                ? Math.round(totalPagesAll / books.length).toLocaleString()
                : "—",
              icon: "📊",
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(99,102,241,0.08)",
                border: "1px solid rgba(99,102,241,0.2)",
                borderRadius: "16px",
                padding: "20px",
                textAlign: "center",
                backdropFilter: "blur(8px)",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "6px" }}>{s.icon}</div>
              <div
                style={{
                  color: "#fff",
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 800,
                  fontFamily: "'Georgia', serif",
                }}
              >
                {s.value}
              </div>
              <div style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Chart Card ── */}
        <div
          style={{
            background: "rgba(15, 12, 41, 0.85)",
            border: "1px solid rgba(99,102,241,0.25)",
            borderRadius: "24px",
            padding: "32px 24px 24px",
            backdropFilter: "blur(12px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#e2e8f0",
                  fontSize: "18px",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                📖 Book Page Distribution
              </h2>
              <p style={{ color: "#475569", fontSize: "13px", margin: "4px 0 0" }}>
                Hover over a bar to see details
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(99,102,241,0.15)",
                border: "1px solid rgba(99,102,241,0.3)",
                borderRadius: "8px",
                padding: "6px 12px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "3px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "inline-block",
                }}
              />
              <span style={{ color: "#a5b4fc", fontSize: "12px", fontWeight: 600 }}>
                Total Pages
              </span>
            </div>
          </div>

          {loading ? (
            <div
              style={{
                height: "340px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#6366f1",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "20px",
                  height: "20px",
                  border: "2px solid #6366f1",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  marginRight: "10px",
                }}
              />
              Loading books…
            </div>
          ) : chartData.length === 0 ? (
            <div
              style={{
                height: "340px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#475569",
                fontSize: "15px",
              }}
            >
              No books found. Add books to your collection!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={340}>
              <BarChart
                data={chartData}
                margin={{ top: 10, right: 20, left: 0, bottom: 60 }}
                barCategoryGap="25%"
              >
                <defs>
                  {BAR_COLORS.map((color, i) => (
                    <linearGradient
                      key={i}
                      id={`barGrad-${i}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                      <stop offset="100%" stopColor={color} stopOpacity={0.4} />
                    </linearGradient>
                  ))}
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(99,102,241,0.1)"
                  vertical={false}
                />
                <XAxis
                  dataKey="bookName"
                  tick={<CustomXTick />}
                  axisLine={{ stroke: "rgba(99,102,241,0.2)" }}
                  tickLine={false}
                  interval={0}
                />
                <YAxis
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v)}
                  width={42}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(99,102,241,0.06)", radius: 8 }}
                />
                <Bar
                  dataKey="totalPages"
                  radius={[8, 8, 0, 0]}
                  onMouseEnter={(_, i) => setActiveIndex(i)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={`url(#barGrad-${index % BAR_COLORS.length})`}
                      opacity={
                        activeIndex === null || activeIndex === index ? 1 : 0.45
                      }
                      style={{ transition: "opacity 0.2s" }}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* ── Book list table ── */}
        {!loading && chartData.length > 0 && (
          <div
            style={{
              marginTop: "28px",
              background: "rgba(15, 12, 41, 0.7)",
              border: "1px solid rgba(99,102,241,0.18)",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    borderBottom: "1px solid rgba(99,102,241,0.2)",
                  }}
                >
                  {["#", "Book", "Author", "Pages"].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: "#6366f1",
                        fontSize: "11px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "14px 16px",
                        textAlign: h === "Pages" ? "right" : "left",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chartData.map((book, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(99,102,241,0.08)",
                      transition: "background 0.15s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "rgba(99,102,241,0.07)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#475569",
                        fontSize: "13px",
                        fontWeight: 600,
                        width: "40px",
                      }}
                    >
                      {i + 1}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#e2e8f0",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {book.bookName}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#94a3b8",
                        fontSize: "13px",
                      }}
                    >
                      {book.author}
                    </td>
                    <td
                      style={{
                        padding: "12px 16px",
                        color: "#a5b4fc",
                        fontSize: "15px",
                        fontWeight: 700,
                        textAlign: "right",
                        fontFamily: "'Georgia', serif",
                      }}
                    >
                      {book.totalPages.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Spinner keyframe (injected once) */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default PagesToRead;

// ── Demo fallback data ─────────────────────────────────────────────────────
const DEMO_BOOKS = [
  { bookName: "The Great Gatsby", author: "F. Scott Fitzgerald", totalPages: 180 },
  { bookName: "To Kill a Mockingbird", author: "Harper Lee", totalPages: 281 },
  { bookName: "1984", author: "George Orwell", totalPages: 328 },
  { bookName: "Pride & Prejudice", author: "Jane Austen", totalPages: 432 },
  { bookName: "The Hobbit", author: "J.R.R. Tolkien", totalPages: 310 },
  { bookName: "Dune", author: "Frank Herbert", totalPages: 688 },
];