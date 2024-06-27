"use client";

import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import UserButton from "./UserButton";
import useCart from "@/lib/hooks/useCart";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession();

  const pathname = usePathname();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const { cartItems } = useCart();

  const router = useRouter();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between gap-2 bg-white px-10 py-2 max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={130} height={100} />
      </Link>

      <div className="flex items-center gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-red-1 ${pathname === "/" && "text-red-1"}`}
        >
          Home
        </Link>
        <Link
          href={session?.user ? "/wishlist" : "/auth/login"}
          className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"}`}
        >
          Wishlist
        </Link>
        <Link
          href={session?.user ? "/orders" : "/auth/login"}
          className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"}`}
        >
          Orders
        </Link>
      </div>

      <div className="relative flex items-center gap-3 rounded-lg border border-grey-2 px-3 py-1">
        <input
          type="text"
          name=""
          id=""
          placeholder="Search..."
          className="w-full bg-transparent outline-none max-sm:max-w-[150px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          title="search"
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="size-4 cursor-pointer text-grey-2 hover:text-red-1" />
        </button>
      </div>

      <div className="relative flex items-center gap-3">
        <Link
          href="/cart"
          className="flex items-center gap-3 rounded-lg border px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu((prev) => !prev)}
        />

        {dropdownMenu && (
          <div className="absolute right-5 top-12 flex flex-col gap-2 rounded-lg border bg-white p-3 text-base-bold lg:hidden">
            <Link
              href={session?.user ? "/wishlist" : "/auth/login"}
              className="hover:text-red-1"
            >
              Wishlist
            </Link>
            <Link
              href={session?.user ? "/orders" : "/auth/login"}
              className="hover:text-red-1"
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-3 rounded-lg border px-2 py-1 hover:bg-black hover:text-white"
            >
              <ShoppingCart />
              <p className="text-base-bold">Cart ({cartItems.length})</p>
            </Link>
          </div>
        )}

        {session ? (
          <UserButton />
        ) : (
          <button
            type="button"
            className=""
            onClick={() => signIn("google")}
            title="Sign in with Google"
          >
            <CircleUserRound />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
