
import {
    CHNAGE_RECTIFY,
    RECTIFY_CHANGE_PRODUCT,
    RECTIFY_CHANGE_PAGE_NUMBER,
    RECTIFY_CHANGE_NEXT_PAGE
} from "../Actions/type";
const initialState = {
    rectify: [],
    rectifySupplierdata: [],
    pageNumber: 1,
    nextPage: false,


}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case RECTIFY_CHANGE_NEXT_PAGE:
            return {
                ...state,
                nextPage: payload,
            };
        case RECTIFY_CHANGE_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: payload,
            };
        case RECTIFY_CHANGE_PRODUCT:
            return {
                ...state,
                rectifySupplierdata: payload,
            };
        case CHNAGE_RECTIFY:
            return {
                ...state,
                rectify: payload,
            };

        default:
            return state;
    }
};