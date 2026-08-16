"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { checkout } from "../api/cart";
import { cartQueryKey } from "./useCart";

// Checks out and sends redirect to the success page with the new order id.
export function useCheckout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,
    onSuccess: ({ orderId }) => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
    },
  });
}
