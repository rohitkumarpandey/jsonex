"use client";

import { useEffect, useState } from "react";

export default function BookmarkPopup() {
  const [visible, setVisible] = useState(false);
  const [shortcut, setShortcut] = useState("Ctrl + D");
  const [platform, setPlatform] = useState("Windows");

  useEffect(() => {
    const dismissed = localStorage.getItem("bookmark-dismissed");

    // ✅ Detect mobile/tablet
    const isMobile =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      window.innerWidth < 768;

    // 🚫 Do NOT show on mobile/tablet
    if (isMobile) return;

    // ✅ Only desktop/laptop continues
    if (!dismissed) {
      setTimeout(() => setVisible(true), 2000);
    }

    const isMac = navigator.platform.toUpperCase().includes("MAC");

    if (isMac) {
      setShortcut("⌘ + D");
      setPlatform("Mac");
    } else {
      setShortcut("Ctrl + D");
      setPlatform("Windows");
    }
  }, []);

  const close = () => {
    setVisible(false);
    localStorage.setItem("bookmark-dismissed", "true");
  };

  if (!visible) return null;

  return (
    <div className="popup">
      <div className="card">
        <button className="close" onClick={close}>
          ✕
        </button>

        <h3>⭐ Bookmark JSONex</h3>
        <p>Save this page for quick access to your JSONex tools anytime.</p>

        <div className="bookmark-hint">
          <div>
            <strong>{platform}:</strong> <span>{shortcut}</span>
          </div>
          <div className="alt">Or use your browser’s ⭐ icon</div>
        </div>

        <div className="actions">
          <button className="primary" onClick={close}>
            Got it!
          </button>
        </div>
      </div>

      <style jsx>{`
        .popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 999;
          animation: slideIn 0.4s ease;
        }

        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .card {
          background: var(--code-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 16px;
          width: 360px;
          position: relative;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .close {
          position: absolute;
          top: 8px;
          right: 8px;
          background: transparent;
          border: none;
          color: var(--text);
          cursor: pointer;
        }

        h3 {
          color: var(--text-h);
          margin-bottom: 6px;
          font-size: 16px;
        }

        p {
          font-size: 13px;
          margin-bottom: 12px;
          color: var(--text);
        }

        .bookmark-hint {
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 10px;
          border-radius: 8px;
          font-size: 16px;
          margin-bottom: 12px;
        }

        .bookmark-hint span {
          color: var(--accent);
          font-weight: 600;
        }

        .alt {
          margin-top: 6px;
          opacity: 0.7;
          font-size: 14px;
        }

        .actions {
          display: flex;
          justify-content: flex-end;
        }

        .primary {
          border: 1px solid var(--border);
          color: var(--text-h);
          padding: 6px 24px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.4rem;
        }

        .primary:hover {
          color: var(--text-h);
          border-color: var(--accent-border);
        }
      `}</style>
    </div>
  );
}