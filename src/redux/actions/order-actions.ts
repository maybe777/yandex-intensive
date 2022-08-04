import {fetchOrder} from "../../api/api";
import {TAppDispatch, TAppThunk} from "../types";
import {TOrderActions} from "../types/order-actions-types";


export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = "GET_ORDER_REQUEST"
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = "GET_ORDER_SUCCESS"
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = "GET_ORDER_ERROR"

export const getOrder = (ingredients: Array<string>): TAppThunk => (dispatch: TAppDispatch) => {

    dispatch(orderRequest());
    fetchOrder(ingredients)
        .then(res => {
            if (res) {
                dispatch(orderSuccess(res))
            } else {
                dispatch(orderError())
            }
        })
        .catch(() => {
            dispatch(orderError());
        });

    function orderRequest() {
        return {
            type: GET_ORDER_REQUEST
        }
    }

    function orderSuccess(res: number) {
        return ({
            type: GET_ORDER_SUCCESS,
            payload: res
        })
    }

    function orderError(): TOrderActions {
        return {
            type: GET_ORDER_ERROR
        }
    }

}

