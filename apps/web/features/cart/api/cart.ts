import { api } from "@/lib/eden";
import type { Cart, CartItem } from "../types";

export async function getCart(): Promise<Cart> {
  const { data, error } = await api.cart.get();
  if (error) throw error;
  return data;
}

export async function addCartItem(productId: string): Promise<CartItem> {
  const { data, error } = await api.cart.items.post({ productId });
  if (error) throw error;
  return data;
}

export async function updateCartItemQuantity(
  itemId: string,
  quantity: number,
): Promise<CartItem> {
  const { data, error } = await api.cart.items({ id: itemId }).patch({
    quantity,
  });
  if (error) throw error;
  return data;
}

export async function removeCartItem(itemId: string): Promise<CartItem> {
  const { data, error } = await api.cart.items({ id: itemId }).delete();
  if (error) throw error;
  return data;
}

export async function checkout(): Promise<{ orderId: string }> {
  const { data, error } = await api.cart.checkout.post();
  if (error) throw error;
  return data;
}
