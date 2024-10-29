import { EstimatedShipment } from "src/modules/customization-system";

import CartItem from "../types/CartItem";

export function updateCartItemEstimatedShipment(
  cartItem: CartItem,
  estimatedShipment: EstimatedShipment | undefined
): void {
  if (cartItem.extension_attributes) {
    cartItem.extension_attributes.estimated_shipment = estimatedShipment;
    return;
  }

  if (!estimatedShipment) {
    return;
  }

  cartItem.extension_attributes = {
    estimated_shipment: estimatedShipment
  };
}
