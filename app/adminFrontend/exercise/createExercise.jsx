import { useState } from "react";

const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  const ytMatch = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  // Direct video (mp4, webm, etc.)
  if (/\.(mp4|webm|ogg)$/i.test(url)) return url;

  return null;
};

const isDirectVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);

export default function CreateExercise() {
  const [form, setForm] = useState({ name: "", description: "", videoUrl: "" });
  const [submitted, setSubmitted] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const embedUrl = getEmbedUrl(form.videoUrl);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUrlBlur = () => {
    setForm({ ...form, videoUrl: urlInput });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={styles.page}>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <span style={styles.tag}>EXERCISE</span>
          <h1 style={styles.title}>NEW EXERCISE</h1>
          <div style={styles.divider} />
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>EXERCISE NAME</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Barbell Squat"
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
            />
          </div>

          {/* Description */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>DESCRIPTION</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Exercise kaise karte hain, kya muscles target hoti hain..."
              rows={4}
              style={{ ...styles.input, resize: "vertical", lineHeight: "1.6" }}
              onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              onBlur={(e) => (e.target.style.borderColor = "#E0E0E0")}
            />
          </div>

          {/* Video URL */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>VIDEO URL</label>
            <div style={styles.inputRow}>
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onBlur={handleUrlBlur}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleUrlBlur())
                }
                placeholder="YouTube / Vimeo / .mp4 link paste karo"
                style={{ ...styles.input, flex: 1, margin: 0 }}
                onFocus={(e) => (e.target.style.borderColor = "#6366f1")}
              />
              <button
                type="button"
                onClick={handleUrlBlur}
                style={styles.previewBtn}
              >
                ▶ Preview
              </button>
            </div>
            <p style={styles.hint}>
              YouTube, Vimeo, ya direct video links support hote hain
            </p>
          </div>

          {/* Video Preview */}
          {form.videoUrl && (
            <div style={styles.videoSection}>
              <div style={styles.videoLabel}>
                <span style={styles.dot} /> VIDEO PREVIEW
              </div>
              {embedUrl ? (
                isDirectVideo(embedUrl) ? (
                  <video src={embedUrl} controls style={styles.video} />
                ) : (
                  <iframe
                    src={embedUrl}
                    title="Exercise Video"
                    style={styles.video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )
              ) : (
                <div style={styles.invalidUrl}>
                  ⚠️ &nbsp; Valid video URL nahi hai. YouTube, Vimeo, ya .mp4
                  link dalo.
                </div>
              )}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              ...(submitted ? styles.submitBtnSuccess : {}),
            }}
            onMouseEnter={(e) => {
              if (!submitted) e.target.style.background = "#4f46e5";
            }}
            onMouseLeave={(e) => {
              if (!submitted) e.target.style.background = "#6366f1";
            }}
          >
            {submitted ? "✓  EXERCISE SAVED!" : "SAVE EXERCISE"}
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#FFFFFF",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 16px",
    fontFamily: "'DM Sans', sans-serif",
  },
  container: {
    width: "100%",
    maxWidth: "680px",
  },
  header: {
    marginBottom: "40px",
  },
  tag: {
    fontSize: "11px",
    letterSpacing: "4px",
    color: "#6366f1",
    fontWeight: 500,
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(52px, 10vw, 80px)",
    color: "#111111",
    margin: "4px 0 16px",
    lineHeight: 1,
    letterSpacing: "2px",
  },
  divider: {
    height: "2px",
    background: "linear-gradient(90deg, #6366f1 0%, transparent 100%)",
    width: "100%",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
    marginTop: "36px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#666",
    fontWeight: 500,
  },
  input: {
    background: "#F8F8F8",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
    padding: "14px 16px",
    color: "#111",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "'DM Sans', sans-serif",
    width: "100%",
    boxSizing: "border-box",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    alignItems: "stretch",
  },
  previewBtn: {
    background: "rgba(99,102,241,0.08)",
    border: "1px solid #6366f1",
    color: "#6366f1",
    borderRadius: "8px",
    padding: "0 18px",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    whiteSpace: "nowrap",
    letterSpacing: "0.5px",
  },
  hint: {
    fontSize: "12px",
    color: "#999",
    margin: 0,
  },
  videoSection: {
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid rgba(99,102,241,0.25)",
    background: "#F4F4F8",
  },
  videoLabel: {
    padding: "10px 16px",
    fontSize: "10px",
    letterSpacing: "3px",
    color: "#888",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderBottom: "1px solid #E8E8E8",
  },
  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#6366f1",
    display: "inline-block",
  },
  video: {
    width: "100%",
    aspectRatio: "16/9",
    border: "none",
    display: "block",
  },
  invalidUrl: {
    padding: "24px",
    color: "#ef4444",
    fontSize: "14px",
    textAlign: "center",
  },
  submitBtn: {
    background: "#6366f1",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "8px",
    padding: "16px",
    fontSize: "13px",
    fontWeight: 700,
    letterSpacing: "2px",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s, transform 0.1s",
    marginTop: "8px",
  },
  submitBtnSuccess: {
    background: "#22c55e",
  },
};
