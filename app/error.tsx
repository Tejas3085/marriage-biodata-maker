"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RotateCcw } from "lucide-react";

// Global error boundary: catches render crashes anywhere in the app and
// shows a branded recovery screen instead of a blank/Next.js error page.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Hook up to your error tracker here (e.g. Sentry) when traffic grows.
    console.error("App crash:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-[#fbf7f2] text-slate-900 flex items-center justify-center px-4 py-16 antialiased">
          <div className="text-center max-w-md">
            <p className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-rose-800">
              Something went wrong
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              Don&apos;t worry — your details are safe
            </h1>
            <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">
              Everything is saved in your browser. Try again, or head home and continue where you left off.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => reset()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-slate-900 text-white text-[14.5px] font-semibold hover:bg-rose-900 transition"
              >
                <RotateCcw className="w-4 h-4" /> Try again
              </button>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-white border border-slate-300 text-[14.5px] font-semibold hover:border-slate-900 transition"
              >
                <Home className="w-4 h-4" /> Go home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
