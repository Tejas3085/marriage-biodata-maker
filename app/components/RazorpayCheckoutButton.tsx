"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, CreditCard } from "lucide-react";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpayScript(): Promise<void> {
  if (typeof window !== "undefined" && window.Razorpay) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay checkout SDK."));
    document.body.appendChild(script);
  });
}

interface RazorpayCheckoutButtonProps {
  amountInRupees?: number;
  description?: string;
  buttonText?: string;
  className?: string;
  onSuccess?: (paymentDetails: { paymentId: string; orderId: string; signature: string }) => void;
  onError?: (errorMessage: string) => void;
}

export default function RazorpayCheckoutButton({
  amountInRupees = 15,
  description = "Premium Template Purchase",
  buttonText,
  className = "",
  onSuccess,
  onError,
}: RazorpayCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handlePayment = async () => {
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // 1. Ensure Razorpay SDK script is loaded
      await loadRazorpayScript();

      // 2. Call backend endpoint to create order (amount in paise, min 100 paise)
      const amountInPaise = Math.round(amountInRupees * 100);
      const orderRes = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

      const keyId =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        orderData.key_id ||
        orderData.keyId;

      if (!keyId) {
        throw new Error("Razorpay Key ID is not configured.");
      }

      // 3. Open Razorpay Standard Checkout modal
      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "Online Free Biodata Maker",
        description,
        order_id: orderData.order_id || orderData.id,
        theme: {
          color: "#881337", // rose-900
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setErrorMessage("Payment was cancelled by the user.");
            if (onError) onError("Payment cancelled by user.");
          },
        },
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            // 4. Send payment_id, order_id, signature to backend verification endpoint
            const verifyRes = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                order_id: response.razorpay_order_id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (!verifyRes.ok || (!verifyData.success && !verifyData.ok)) {
              throw new Error(verifyData.error || "Payment signature verification failed.");
            }

            setSuccessMessage(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
            setLoading(false);

            if (onSuccess) {
              onSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              });
            }
          } catch (err: any) {
            const msg = err?.message || "Failed to verify payment.";
            setErrorMessage(msg);
            setLoading(false);
            if (onError) onError(msg);
          }
        },
      };

      const razorpayInstance = new window.Razorpay(options);

      // Handle payment.failed event
      razorpayInstance.on("payment.failed", (response: any) => {
        const failureReason =
          response?.error?.description ||
          response?.error?.reason ||
          "Payment failed. Please try again with another payment method.";
        setErrorMessage(failureReason);
        setLoading(false);
        if (onError) onError(failureReason);
      });

      razorpayInstance.open();
    } catch (err: any) {
      const msg = err?.message || "An unexpected error occurred.";
      setErrorMessage(msg);
      setLoading(false);
      if (onError) onError(msg);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        type="button"
        id="razorpay-checkout-btn"
        onClick={handlePayment}
        disabled={loading}
        className={
          className ||
          "inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-rose-900 hover:bg-rose-800 text-white font-semibold text-[15px] shadow-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        }
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" />
            <span>{buttonText || `Pay ₹${amountInRupees} with Razorpay`}</span>
          </>
        )}
      </button>

      {/* Error state display */}
      {errorMessage && (
        <div
          role="alert"
          className="mt-3.5 w-full max-w-md p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[13px] flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <p className="flex-1 leading-snug">{errorMessage}</p>
        </div>
      )}

      {/* Success state display */}
      {successMessage && (
        <div
          role="status"
          className="mt-3.5 w-full max-w-md p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[13px] flex items-start gap-2.5"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="flex-1 leading-snug">{successMessage}</p>
        </div>
      )}
    </div>
  );
}
