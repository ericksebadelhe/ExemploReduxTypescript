import { Reducer } from "redux";
import produce from 'immer';
import { ActionTypes, ICartState } from "./types";
import { REHYDRATE } from 'redux-persist/lib/constants';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ActionTypes.addProductToCartSuccess: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item =>
          item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }
        break;
      }
      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }

      case ActionTypes.removeProductToCart: {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item =>
          item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          if (draft.items[productInCartIndex].quantity === 1) {
            draft.items.splice(productInCartIndex, 1);
            break;
          } else if (draft.items[productInCartIndex].quantity > 1) {
            draft.items[productInCartIndex].quantity--;
            break;
          }
        } else {
          return draft;
        }
        break;
      }

      case ActionTypes.finishShopping: {
        return draft = INITIAL_STATE;
      }

      case REHYDRATE:
        return { ...state, persistedState: action.payload };

      default: {
        return draft;
      }
    }
  });
}

export default cart;