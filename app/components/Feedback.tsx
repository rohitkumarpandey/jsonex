"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function FeedbackForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    type: "feedback",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.message.trim()) return;

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send feedback.");
      }

      setSuccess(true);
      setForm({
        name: "",
        email: "",
        message: "",
        type: "feedback",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-wrapper">
      <div className="card">
        <h2>Share your feedback</h2>

        <p className="subtitle">
          Found a bug? Have an idea? I'd love to hear it.
        </p>

        {/* TYPE */}
        <div className="types">
          {["feedback", "bug", "feature"].map((t) => (
            <button
              key={t}
              type="button"
              className={`chip ${form.type === t ? "active" : ""}`}
              onClick={() => update("type", t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* NAME */}
        <div className="field">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        {/* EMAIL */}
        <div className="field">
          <input
            type="email"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        {/* MESSAGE */}
        <div className="field">
          <textarea
            placeholder="Tell me what's on your mind..."
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            rows={10}
            style={{
              resize: "none",
            }}
          />
        </div>

        {/* SUBMIT */}
        <button
          type="button"
          className="submit"
          onClick={submit}
          disabled={loading || !form.message.trim()}
        >
          {loading ? "Sending..." : "Send Feedback"}
          <Send size={16} />
        </button>

        {success && (
          <div className="success">
            Thanks! We've received your feedback.
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}