"use client";

import { useState } from "react";
import { verifyPassword } from "./actions";

export function PasswordGate() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await verifyPassword(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-10">
      <div className="w-full max-w-[400px]">
        <div className="flex justify-center mb-[24px]">
          <div className="w-[48px] h-[48px] rounded-full bg-bg-secondary flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-text-muted">
              <rect x="2" y="7" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
              <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-[20px] md:text-[22px] lg:text-[24px] font-semibold tracking-tight text-text-primary text-center">
          Full case study
        </h1>
        <p className="mt-[8px] text-[16px] md:text-[18px] text-text-muted text-center">
          Enter the password to view the complete walkthrough.
        </p>

        <form onSubmit={handleSubmit} className="mt-[24px]">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            autoFocus
            className="w-full rounded-sm border border-border bg-white px-[16px] py-[12px] text-[16px] text-text-primary placeholder:text-text-muted/50 focus:outline-none focus:border-text-secondary transition-colors"
          />

          {error && (
            <p className="mt-[8px] text-[14px] text-accent">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-[16px] w-full rounded-sm bg-accent px-[20px] py-[12px] text-[16px] font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
