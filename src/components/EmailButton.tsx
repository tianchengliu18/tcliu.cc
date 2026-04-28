"use client";

import { useState } from "react";

interface Props {
  label: string;
  email: string;
}

export default function EmailButton({ label, email }: Props) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Try the modern clipboard API; fall back to a temporary textarea on older browsers.
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // If clipboard access is denied, let the mailto fallback through.
      return;
    }
    // Suppress the mailto navigation only after a successful copy. Right-click
    // and middle-click still expose the original mailto for users who do have
    // a mail client.
    e.preventDefault();
  };

  return (
    <a
      href={`mailto:${email}`}
      onClick={handleClick}
      title={email}
      className="relative text-base px-3 py-1.5 border border-border rounded-md text-text-secondary hover:text-accent hover:border-accent transition-colors"
    >
      {copied ? "Copied!" : label}
    </a>
  );
}
