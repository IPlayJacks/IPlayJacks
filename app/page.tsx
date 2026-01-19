export default function Home() {
  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f5f5", padding: "48px", fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
<img
  src="/play-jacks-logo.svg"
  alt="Play Jacks logo"
  style={{ width: 48, height: 48, marginBottom: 12 }}
/>

        <p style={{ letterSpacing: "0.25em", fontSize: 12, opacity: 0.65 }}>I PLAY JACKS</p>

        <h1 style={{ fontSize: 56, marginTop: 18, marginBottom: 0 }}>I PLAY JACKS.</h1>

        <p style={{ marginTop: 18, fontSize: 18, lineHeight: 1.6, opacity: 0.85 }}>
          Pocket jacks sit between confidence and fear. There are no right answers — only decisions.
        </p>

        <div style={{ marginTop: 36, padding: 22, border: "1px solid #2a2a2a", borderRadius: 12, background: "rgba(255,255,255,0.02)" }}>
          <p style={{ margin: 0, fontSize: 16 }}>
            <span style={{ opacity: 0.7 }}>Question:</span> <strong>How do you play your jacks?</strong>
          </p>
          <p style={{ marginTop: 10, marginBottom: 0, fontSize: 14, opacity: 0.7 }}>
            Read real poker horror/success stories from real players — and post your own.
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="/stories" style={{ background: "#f5f5f5", color: "#0a0a0a", padding: "12px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 600 }}>
              Enter the Stories →
            </a>
            <a href="#email" style={{ border: "1px solid #3a3a3a", color: "#f5f5f5", padding: "12px 18px", borderRadius: 10, textDecoration: "none", fontWeight: 600 }}>
              Get launch updates
            </a>
          </div>
        </div>

        <div id="email" style={{ marginTop: 28 }}>
          <p style={{ margin: 0, fontSize: 12, opacity: 0.6 }}>Email (we’ll wire this up next)</p>
          <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              placeholder="you@email.com"
              style={{ flex: 1, minWidth: 240, padding: "12px 14px", borderRadius: 10, border: "1px solid #2a2a2a", background: "#111", color: "#f5f5f5" }}
            />
            <button style={{ padding: "12px 18px", borderRadius: 10, border: "none", background: "#f5f5f5", color: "#0a0a0a", fontWeight: 700 }}>
              Join
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


