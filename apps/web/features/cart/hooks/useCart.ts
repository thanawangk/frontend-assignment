"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../api/cart";
import type { Cart, CartLine } from "../types";

export const cartQueryKey = ["cart"] as const;

const cartQueryOptions = {
  queryKey: cartQueryKey,
  queryFn: getCart,
};

export function useCart() {
  const { data: cart, isPending } = useQuery(cartQueryOptions);
  return { cart, isPending };
}

export function useCartLine(productId: string): CartLine | undefined {
  const { data: line } = useQuery({
    ...cartQueryOptions,
    select: (cart: Cart) =>
      cart.items.find((item) => item.productId === productId),
  });

  return line;
}

export function useCartMutations() {
  const queryClient = useQueryClient();

  const refreshCart = () =>
    queryClient.invalidateQueries({ queryKey: cartQueryKey });

  const addItem = useMutation({
    mutationFn: addCartItem,
    onSuccess: refreshCart,
  });

  const setQuantity = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      updateCartItemQuantity(itemId, quantity),
    onSuccess: refreshCart,
  });

  const removeItem = useMutation({
    mutationFn: removeCartItem,
    onSuccess: refreshCart,
  });

  return {
    addItem,
    setQuantity,
    removeItem,
    isUpdating:
      addItem.isPending || setQuantity.isPending || removeItem.isPending,
  };
}
