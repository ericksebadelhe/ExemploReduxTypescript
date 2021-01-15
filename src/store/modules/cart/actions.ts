import { markActionsOffline } from "redux-offline-queue";
import { ActionTypes, ICartItem, IProduct } from "./types";

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartRequest,
    payload: {
      product,
    }
  };
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.addProductToCartSuccess,
    payload: {
      product,
    }
  };
}

export function addProductToCartFailure(productId: number) {
  return {
    type: ActionTypes.addProductToCartFailure,
    payload: {
      productId,
    }
  };
}

export function removeProductToCart(product: IProduct) {
  return {
    type: ActionTypes.removeProductToCart,
    payload: {
      product,
    }
  };
}

export function finishShopping(items: ICartItem[]) {
  return {
    type: ActionTypes.finishShopping,
    payload: {
      items,
    },
    meta: {
      retry: true
    }
  };
}

markActionsOffline(ActionTypes, [ActionTypes.finishShopping]);