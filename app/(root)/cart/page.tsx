"use client";

import useCart from "@/lib/hooks/useCart";
import axios from "axios";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const CartPage = () => {
  const cart = useCart();

  const { data: session } = useSession();
  const router = useRouter();

  const total = parseFloat(
    cart.cartItems
      .reduce(
        (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
        0,
      )
      .toFixed(2),
  );

  const customer = {
    id: session?.user.id,
    email: session?.user.email,
    name: session?.user.name,
  };

  const checkoutHandler = async () => {
    try {
      if (!session) {
        signIn('google')
      } else {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
          JSON.stringify({ cartItems: cart.cartItems, customer }),
        );
        const data = await res.data;
        window.location.href = data.url;
        console.log(data)
      }
    } catch (error) {
      console.log("[checkout_POST]", error);
    }
  };

  return (
    <div className="flex gap-20 px-10 py-16 max-lg:flex-col">
      <div className="w-2/3 max-lg:w-full">
        <p className="text-heading3-bold">Shopping Cart</p>
        <hr className="my-6" />

        {cart.cartItems.length === 0 ? (
          <p className="text-body-bold">No items in cart</p>
        ) : (
          <div>
            {cart.cartItems.map((cartItem) => (
              <div
                key={cartItem.item._id}
                className="flex w-full items-center justify-between px-6 py-5 hover:bg-grey-1 max-sm:flex-col max-sm:items-start max-sm:gap-3"
              >
                <div className="flex items-center">
                  <Image
                    src={cartItem.item.media[0]}
                    alt="product image"
                    width={100}
                    height={100}
                    className="size-32 rounded-lg object-cover"
                  />

                  <div className="ml-4 flex flex-col gap-3">
                    <p className="text-body-bold">{cartItem.item.title}</p>
                    {cartItem.color && (
                      <p className="text-small-medium">
                        Color: {cartItem.color}
                      </p>
                    )}
                    {cartItem.size && (
                      <p className="text-small-medium">Size: {cartItem.size}</p>
                    )}
                    <p className="text-small-medium">${cartItem.item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MinusCircle
                    className="cursor-pointer hover:text-red-1"
                    onClick={() => cart.decreaseQuantity(cartItem.item._id)}
                  />
                  <p className="text-body-bold">{cartItem.quantity}</p>
                  <PlusCircle
                    className="cursor-pointer hover:text-red-1"
                    onClick={() => cart.increaseQuantity(cartItem.item._id)}
                  />
                </div>

                <Trash
                  className="cursor-pointer hover:text-red-1"
                  onClick={() => cart.removeItem(cartItem.item._id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-1/3 flex-col gap-8 rounded-lg bg-grey-1 px-4 py-5 max-lg:w-full">
        <p className="pb-4 text-heading4-bold">
          Summary{" "}
          <span>{`(${cart.cartItems.length} ${cart.cartItems.length > 1 ? "items" : "item"})`}</span>
        </p>
        <div className="flex justify-between text-body-semibold">
          <span>Total Amount</span>
          <span>${total}</span>
        </div>

        <button
          type="button"
          className="w-full rounded-lg border bg-white py-3 text-body-bold hover:bg-black hover:text-white"
          onClick={checkoutHandler}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default CartPage;
