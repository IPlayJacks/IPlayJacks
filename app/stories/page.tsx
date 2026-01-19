"use client";

import { useEffect, useState } from "react";

type Story = {
  id: string;
  title: string;
  body: string;
  outcome: string;
  anonymous_name: string;
  created_at: string;
};

export default function Stories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [outcome, setOutcome] = useState("horror");
  const [name, setName] = useState("");
  const [website, setWebsite] = useState(""); // honeypot (bots will fill)
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
const [filter, setFilter] = useState<"all" | "horror" | "success" | "neutral">("all");

const filteredStories =
  filter === "all" ? stories : stories.filter((s) => s.outcome === filter);


  async function loadStories() {
    const res = await fetch("/api/stories");
    const json = await res.json();
    setStories(json.data || []);
  }

  async function submitStory(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, story, outcome, name, website }),

    });

    const json = await res.json();

    if (!res.ok) {
      setMessage(json.error || "Something went wrong");
    } else {
      setMessage("Story posted.");
      setTitle("");
      setStory("");
      setName("");
      await loadStories();
    }

    setLoading(false);
  }

  useEffect(() => {
    loadStories();
  }, []);

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a", color: "#f5f5f5", padding: 48, fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <a href="/" style={{ color: "#f5f5f5", textDecoration: "none", opacity: 0.7 }}>← Back</a>

        <header style={{ marginTop: 18 }}>
<img
  src="/play-jacks-logo.svg"
  alt="Play Jacks logo"
  style={{ width: 48, height: 48, marginBottom: 12 }}
/>

  <p style={{ letterSpacing: "0.28em", fontSize: 12, opacity: 0.65, margin: 0 }}>
    I PLAY JACKS
  </p>

  <h1 style={{ fontSize: 44, marginTop: 14, marginBottom: 8 }}>
    How I Play My Jacks
  </h1>

  <p style={{ marginTop: 0, opacity: 0.8, lineHeight: 1.6 }}>
    Pocket jacks are the hand people misplay, fear, or swear are cursed.
    Post your line. Read the pain. Learn the patterns.
  </p>

  <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
    <span style={{ border: "1px solid #2a2a2a", padding: "6px 10px", borderRadius: 999, fontSize: 12, opacity: 0.85 }}>
      Question: <strong>How do you play your jacks?</strong>
    </span>
  </div>
</header>


   <form
  onSubmit={submitStory}
  style={{
    marginTop: 24,
    border: "1px solid #2a2a2a",
    padding: 20,
    position: "relative",
  }}
>
  {/* Honeypot field (hidden) */}
  <div style={{ position: "absolute", left: "-10000px" }}>
    <input
      value={website}
      onChange={(e) => setWebsite(e.target.value)}
      autoComplete="off"
      tabIndex={-1}
    />
  </div>


          <input
            placeholder="Title (e.g. 3-bet jacks under the gun)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
            required
          />

          <textarea
            placeholder="Tell the story..."
            value={story}
            onChange={(e) => setStory(e.target.value)}
            style={{ width: "100%", padding: 10, height: 110, marginBottom: 10 }}
            required
          />

<div style={{ marginTop: 28, display: "flex", gap: 10, flexWrap: "wrap" }}>
  {[
    { key: "all", label: "All" },
    { key: "horror", label: "Horror" },
    { key: "success", label: "Success" },
    { key: "neutral", label: "Neutral" },
  ].map((b) => (
    <button
      key={b.key}
      onClick={() => setFilter(b.key as any)}
      style={{
        padding: "10px 14px",
        borderRadius: 999,
        border: "1px solid #2a2a2a",
        background: filter === b.key ? "#f5f5f5" : "transparent",
        color: filter === b.key ? "#0a0a0a" : "#f5f5f5",
        fontWeight: 700,
        cursor: "pointer",
      }}
      type="button"
    >
      {b.label}
    </button>
  ))}
</div>
          
<select value={outcome} onChange={(e) => setOutcome(e.target.value)} style={{ width: "100%", padding: 10, marginBottom: 10 }}>
            <option value="horror">Horror</option>
            <option value="success">Success</option>
            <option value="neutral">Neutral</option>
          </select>

          <input
            placeholder="Name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", padding: 10, marginBottom: 10 }}
          />

          <button disabled={loading} style={{ padding: "10px 16px", fontWeight: 700 }}>
            {loading ? "Posting..." : "Post Story"}
          </button>

          {message && <p style={{ marginTop: 10 }}>{message}</p>}
        </form>

        <div style={{ marginTop: 40 }}>
          {filteredStories.length === 0
 ? (
            <p style={{ opacity: 0.7 }}>No stories yet. Post the first one.</p>
          ) : (
            filteredStories.map((s) => (
  <div
    key={s.id}
    style={{
      border: "1px solid #2a2a2a",
      borderRadius: 14,
      padding: 18,
      marginBottom: 14,
      background: "rgba(255,255,255,0.02)",
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
      <h3 style={{ margin: 0 }}>{s.title}</h3>
      <span
        style={{
          border: "1px solid #2a2a2a",
          borderRadius: 999,
          padding: "6px 10px",
          fontSize: 12,
          opacity: 0.85,
        }}
      >
        {s.outcome.toUpperCase()}
      </span>
    </div>

    <p style={{ opacity: 0.85, marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
      {s.body}
    </p>

    <p style={{ fontSize: 12, opacity: 0.65, marginTop: 12, marginBottom: 0 }}>
      {s.anonymous_name || "Anonymous"}
    </p>
  </div>
))

          )}
        </div>
      </div>
    </main>
  );
}
