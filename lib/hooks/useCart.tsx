import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string) => void;
  increaseQuantity: (idToIncrease: string) => void;
  decreaseQuantity: (idToDecrease: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems;
        const isExisting = currentItems.find(
          (cartItem) => cartItem.item._id === item._id,
        );
        if (isExisting) {
          return toast("Item already in cart");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart", { icon: "🛒" });
      },
      removeItem: (_id: string) => {
        const newCartItem = get().cartItems.filter(
          (cartItem) => cartItem.item._id !== _id,
        );
        set({ cartItems: newCartItem });
        toast.success("Item removed from cart");
      },

      increaseQuantity: (idToIncrease: String) => {
        const newCartItems = get().cartItems.map((cartItem) =>
          cartItem.item._id === idToIncrease
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
        set({ cartItems: newCartItems });
        toast.success("Item quantity increased");
      },

      decreaseQuantity: (idToDecrease: string) => {
        const newCartItems = get().cartItems.reduce((acc, cartItem) => {
          if (cartItem.item._id === idToDecrease) {
            if (cartItem.quantity > 1) {
              acc.push({ ...cartItem, quantity: cartItem.quantity - 1 });
              toast.success("Item quantity decreased");
            } else {
              toast.success("Item removed from cart");
            }
          } else {
            acc.push(cartItem);
          }
          return acc;
        }, [] as CartItem[]);
        set({ cartItems: newCartItems });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCart;
