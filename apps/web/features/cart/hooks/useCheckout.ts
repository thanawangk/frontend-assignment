"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { checkout as checkoutRequest } from "../api/cart";
import { cartQueryKey } from "./useCart";

export function useCheckout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const checkout = useMutation({
    mutationFn: checkoutRequest,
    onSuccess: ({ orderId }) => {
      queryClient.invalidateQueries({ queryKey: cartQueryKey });
      router.push(`/checkout/success?orderId=${encodeURIComponent(orderId)}`);
    },
  });

  return {
    checkout,
    isCheckingOut: checkout.isPending || checkout.isSuccess,
  };
}
