"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../components/SiteHeader";
import FooterPage from "../components/SiteFooter";
import RazorpayCheckoutButton from "../components/RazorpayCheckoutButton";
import { ShieldCheck, Check, Sparkles, ArrowLeft, Terminal } from "lucide-react";

export default function CheckoutPage() {
  const [testAmount, setTestAmount] = useState<number>(15);
  const [lastPayment, setLastPayment] = useState<{
    paymentId: string;
    orderId: string;
    signature: string;
  } | null>(null);

  return (
    <main className="min-h-screen bg-[#fbfaf8] text-slate-900 flex flex-col justify-between">
      <Header />

      <section className="mx-auto max-w-3xl px-4 sm:px-6 py-12 md:py-16 w-full">
        <div className="mb-6">
          <Link
            href="/preview"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-slate-600 hover:text-rose-900 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to preview
          </Link>
        </div>

        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-900 text-[12px] font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Razorpay Standard Checkout
          </span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Secure Payment Gateway
          </h1>
          <p className="mt-2 text-slate-600 text-[15px] max-w-lg mx-auto">
            Test Razorpay Standard Web Checkout with automated order creation and cryptographic HMAC-SHA256 signature verification.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8">
          <div className="border-b border-slate-100 pb-6 mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Select Amount to Test</h2>
            <p className="text-[13.5px] text-slate-500 mt-1">
              Choose an amount to create a test order in Razorpay (minimum ₹1 = 100 paise).
            </p>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[1, 15, 49].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTestAmount(amt)}
                  className={`py-2.5 px-4 rounded-xl border text-sm font-semibold transition-all ${
                    testAmount === amt
                      ? "border-rose-900 bg-rose-50 text-rose-900 shadow-xs"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  ₹{amt} {amt === 1 ? "(Min Test)" : amt === 15 ? "(Premium)" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 mb-6 border border-slate-100">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-600">Test Item:</span>
              <span className="font-semibold text-slate-900">Marriage Biodata Premium Design</span>
            </div>
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-slate-600">Currency:</span>
              <span className="font-semibold text-slate-900">INR (₹)</span>
            </div>
            <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-200">
              <span className="font-semibold text-slate-900">Total Payable:</span>
              <span className="text-xl font-bold text-rose-900">₹{testAmount}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="flex flex-col items-center">
            <RazorpayCheckoutButton
              amountInRupees={testAmount}
              description={`Biodata Premium Template — ₹${testAmount}`}
              buttonText={`Pay ₹${testAmount} with Razorpay`}
              onSuccess={(details) => setLastPayment(details)}
            />

            <p className="mt-3 text-[12px] text-slate-400 text-center flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Secured by Razorpay Standard Checkout • Test Mode
            </p>
          </div>

          {/* Success details box */}
          {lastPayment && (
            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 text-[13px]">
              <div className="flex items-center gap-2 font-semibold text-emerald-800 mb-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Verified Payment Details:
              </div>
              <div className="space-y-1 font-mono text-[12px] bg-white p-3 rounded-lg border border-emerald-100 overflow-x-auto">
                <p><span className="text-slate-400">Payment ID:</span> {lastPayment.paymentId}</p>
                <p><span className="text-slate-400">Order ID:</span> {lastPayment.orderId}</p>
                <p className="truncate"><span className="text-slate-400">Signature:</span> {lastPayment.signature}</p>
              </div>
            </div>
          )}
        </div>

        {/* Integration Architecture Summary */}
        <div className="mt-8 rounded-2xl bg-slate-900 text-slate-200 p-5 sm:p-6 text-[13px] border border-slate-800">
          <div className="flex items-center gap-2 font-semibold text-white mb-3">
            <Terminal className="w-4 h-4 text-rose-400" />
            <span>Active Razorpay Standard Checkout Endpoints:</span>
          </div>
          <ul className="space-y-2 text-slate-300 font-mono text-[12px]">
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">POST</span>
              <span>/api/create-order &mdash; creates order in paise, minimum 100 paise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-400">GET</span>
              <span>https://checkout.razorpay.com/v1/checkout.js &mdash; Standard Checkout modal</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-400">POST</span>
              <span>/api/verify-payment &mdash; HMAC-SHA256 cryptographic verification</span>
            </li>
          </ul>
        </div>
      </section>

      <FooterPage />
    </main>
  );
}
