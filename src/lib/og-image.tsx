export const ogImageSize = {
  width: 1200,
  height: 630,
};

export function PortfolioOgImage({
  title,
  description,
  label,
}: {
  title: string;
  description: string;
  label: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 58%, #164e63 100%)",
        color: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#67e8f9",
          }}
        />
        <div style={{ fontSize: "22px", color: "#a5f3fc", letterSpacing: "5px" }}>
          PORTFOLIO
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          maxWidth: "1000px",
        }}
      >
        <div style={{ fontSize: "22px", color: "#94a3b8", letterSpacing: "4px" }}>{label}</div>
        <div
          style={{
            fontSize: title.length > 35 ? "58px" : "76px",
            fontWeight: 700,
            lineHeight: 1.05,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: "28px", lineHeight: 1.4, color: "#cbd5e1" }}>{description}</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#67e8f9",
          fontSize: "22px",
        }}
      >
        <div>Muhammad Ulil Azmi</div>
        <div>Web Developer</div>
      </div>
    </div>
  );
}
