
import { CHANGE_CART_DATA , CHANGE_CART_DATE_MODAL , CHANGE_CART_CONFIRM_DATE_DATA , CHANGE_ORDER_DETAIL} from "../Actions/type";
const initialState = {
    cart: [],
    cartModal : false,
    cartDateData: {},
    orderDetail:[]

}

export default (state = initialState, { type, payload }) => {
    console.log("type:::")
    console.log(type)
    console.log("Payload::::")
    
   
    switch (type) {
        case CHANGE_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: payload,
            };
        case CHANGE_CART_CONFIRM_DATE_DATA:
            return {
                ...state,
                cartDateData: payload,
            };
        case CHANGE_CART_DATE_MODAL:
            return {
                ...state,
                cartModal: payload,
            };
        case CHANGE_CART_DATA:
            return {
                ...state,
                cart: payload,
            };

        default:
            return state;
    }
};