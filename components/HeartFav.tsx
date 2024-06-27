"use client";

import axios from "axios";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const HeartFav = ({
  product,
  updateUser,
}: {
  product: ProductType;
  updateUser?: (updatedUser: UserType) => void;
}) => {
  const { data: session } = useSession();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLike] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users");
      const data = res.data;
      setIsLike(data.wishlist.includes(product._id));
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

  const likeHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (!session?.user) {
      router.push("/auth/login");
      return;
    } else {
      try {
        setLoading(true);
        const res = await axios.post("/api/users/wishlist", {
          productId: product._id,
        });
        const data = await res.data;
        setIsLike(data.wishlist.includes(product._id));
        updateUser && updateUser(data);
      } catch (error) {
        console.log("[wishlist_POST]", error);
      }
    }
  };
  return (
    <button type="button" title="add to wishlist" onClick={likeHandler}>
      <Heart className={`${isLiked && "fill-red-500"}`} />
    </button>
  );
};

export default HeartFav;
