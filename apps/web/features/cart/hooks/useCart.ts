"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../api/cart";

export const cartQueryKey = ["cart"] as const;

export function useCart() {
  const queryClient = useQueryClient();
  const { data: cart, isPending } = useQuery({
    queryKey: cartQueryKey,
    queryFn: getCart,
  });

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
    cart,
    isPending,
    addItem,
    setQuantity,
    removeItem,
    isUpdating:
      addItem.isPending || setQuantity.isPending || removeItem.isPending,
  };
}
