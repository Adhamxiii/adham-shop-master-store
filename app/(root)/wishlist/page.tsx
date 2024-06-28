"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions";
import axios from "axios";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const WishlistPage = () => {
  const { data: session } = useSession();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await axios.get("/api/users");
      const { data } = res;
      setSignedInUser(data);
      setLoading(false);
    } catch (error) {
      console.log("[users_GET]", error);
    }
  };

  useEffect(() => {
    if (session?.user) {
      getUser();
    }
  }, [session?.user]);

  const getWishlistProducts = async () => {
    setLoading(true);

    if (!signedInUser) {
      return;
    }

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        return await getProductDetails(productId);
      }),
    );
    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="my-10 text-heading3-bold">Your Wishlist</p>
      {wishlist.length === 0 && (
        <p className="my-5 text-body-bold">No products in your wishlist</p>
      )}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            updateUser={updateSignedInUser}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;

export const dynamic = "force-dynamic";
