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

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const submit = async () => {
    if (!form.message.trim()) return;

    setLoading(true);

    // simulate API
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setForm({ name: "", email: "", message: "", type: "feedback" });
    }, 1000);
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
              className={`chip ${form.type === t ? "active" : ""}`}
              onClick={() => update("type", t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* INPUTS */}
        <div className="field">
          <input
            placeholder="Your name (optional)"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
          />
        </div>

        <div className="field">
          <input
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

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

        {/* ACTION */}
        <button
          className="submit"
          onClick={submit}
          disabled={loading || !form.message.trim()}
        >
          {loading ? "Sending..." : "Send Feedback"}
          <Send size={16} />
        </button>

        {success && <div className="success">Thanks! We've received your feedback.</div>}
      </div>
    </div>
  );
}