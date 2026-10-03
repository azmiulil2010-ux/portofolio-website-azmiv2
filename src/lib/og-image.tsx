export const ogImageSize = {
  width: 1200,
  height: 630,
};

export function PortfolioOgImage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "340px",
          height: "340px",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #334155",
          borderRadius: "88px",
          background: "linear-gradient(145deg, #111c32 0%, #080f1e 100%)",
          boxShadow: "0 0 90px rgba(34, 211, 238, 0.14)",
          color: "#67e8f9",
          fontFamily: "Arial, sans-serif",
          fontSize: "260px",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        A
      </div>
    </div>
  );
}
