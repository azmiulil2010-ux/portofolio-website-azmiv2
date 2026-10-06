export const ogImageSize = {
  width: 1200,
  height: 630,
};

export function PortfolioOgImage() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "58px 72px",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 82% 48%, rgba(232, 236, 48, 0.14) 0%, rgba(232, 236, 48, 0) 42%), linear-gradient(115deg, #171819 0%, #1c1d18 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 210,
          width: 180,
          height: 290,
          borderRadius: "0 0 22px 22px",
          background: "#eef34a",
          transform: "skewX(-29deg) translateX(70px)",
          opacity: 0.98,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -52,
          top: 105,
          width: 155,
          height: 420,
          borderRadius: "22px 0 0 22px",
          background: "#eef34a",
          transform: "skewY(-31deg)",
          opacity: 0.98,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          border: "1px solid rgba(255, 255, 255, 0.04)",
        }}
      >
        {[72, 330, 588, 846, 1104].map((left) => (
          <div
            key={left}
            style={{
              position: "absolute",
              left,
              top: 0,
              bottom: 0,
              width: 1,
              background: "rgba(255, 255, 255, 0.045)",
            }}
          />
        ))}
        {[105, 315, 525].map((top) => (
          <div
            key={top}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top,
              height: 1,
              background: "rgba(255, 255, 255, 0.045)",
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            display: "flex",
            width: 38,
            height: 38,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            background: "#eef34a",
            color: "#171819",
            fontFamily: "Arial, sans-serif",
            fontSize: 23,
            fontWeight: 700,
          }}
        >
          A
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#f5f5f0",
            fontFamily: "Arial, sans-serif",
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: 0.4,
          }}
        >
          <span>Muhammad Ulil Azmi</span>
          <span style={{ color: "#a3a59a", fontSize: 11, fontWeight: 400 }}>
            PORTFOLIO
          </span>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          maxWidth: 790,
          marginTop: 54,
          marginBottom: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#eef34a",
            fontFamily: "Arial, sans-serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: 3,
          }}
        >
          <div
            style={{
              width: 30,
              height: 2,
              background: "#eef34a",
            }}
          />
          WEB DEVELOPER · SISWA RPL
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#f5f5f0",
            fontFamily: "Arial, sans-serif",
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: -3,
            lineHeight: 1.08,
          }}
        >
          <span>Muhammad Ulil</span>
          <span>Azmi</span>
        </div>
        <div
          style={{
            maxWidth: 630,
            color: "#b2b3aa",
            fontFamily: "Arial, sans-serif",
            fontSize: 20,
            lineHeight: 1.45,
          }}
        >
          Membangun website modern yang rapi, cepat, dan bermakna.
        </div>
      </div>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          color: "#8f9187",
          fontFamily: "Arial, sans-serif",
          fontSize: 13,
          letterSpacing: 1,
        }}
      >
        <span>DESIGN · DEVELOPMENT · DIGITAL</span>
        <span style={{ color: "#eef34a" }}>PORTOFOLIO 2026</span>
      </div>
    </div>
  );
}
