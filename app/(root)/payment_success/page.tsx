"use client";

import Confetti from "react-confetti";
import React, { useEffect } from "react";
import Link from "next/link";
import useCart from "@/lib/hooks/useCart";

const SuccessfulPayment = () => {
  const cart = useCart();

  useEffect(() => {
    cart.clearCart();
  }, []);

  return (
    <div className="relative flex h-[calc(100vh-83px)] flex-col items-center justify-center gap-5">
      <Confetti width={2000} height={1000} className="absolute h-full w-full" />
      <p className="text-heading1-bold text-green-600">Successful Payment</p>
      <p className="text-body-bold">Thank you for shopping with us</p>
      <Link
        href="/"
        className="rounded-lg p-4 text-base-bold hover:bg-black hover:text-white"
      >
        CONTINUE TO SHOPPING
      </Link>
    </div>
  );
};

export default SuccessfulPayment;

export const dynamic = "force-dynamic";