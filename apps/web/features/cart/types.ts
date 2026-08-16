import type { api } from "@/lib/eden";

type CartResponse = Awaited<ReturnType<typeof api.cart.get>>["data"];
type CartItemResponse = Awaited<
  ReturnType<ReturnType<typeof api.cart.items>["delete"]>
>["data"];

export type Cart = NonNullable<CartResponse>;
export type CartLine = Cart["items"][number];
export type CartItem = NonNullable<CartItemResponse>;
