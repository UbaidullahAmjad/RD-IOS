import {
    CHANGE_PRANCHISE,
    CHANGE_CATEGORY,
    CHANGE_PRODUCT,
    CHANGE_PAGE_NUMBER,
    CHANGE_NEXT_PAGE,
    CHANGE_DONUTS_DATA,
    CHANGE_CATEGORY_ID
} from "../Actions/type";

const initialState = {
    franchiseData: [],
    category: [],
    product: [],
    donuts: [],
    pageNumber: 1,
    nextPage: false,
    categoryid:null
}
export default (state = initialState, { type, payload }) => {
    switch (type) {
        case CHANGE_CATEGORY_ID:
            return {
                ...state,
                categoryid: payload,
            };
        case CHANGE_PAGE_NUMBER:
            return {
                ...state,
                pageNumber: payload,
            };
        case CHANGE_NEXT_PAGE:
            return {
                ...state,
                nextPage: payload,
            };
        case CHANGE_DONUTS_DATA:
            return {
                ...state,
                donuts: payload,
            };
        case CHANGE_PRODUCT:
            return {
                ...state,
                product: payload,
            };
        case CHANGE_CATEGORY:
            return {
                ...state,
                category: payload,
            };
        case CHANGE_PRANCHISE:
            return {
                ...state,
                franchiseData: payload,
            };

        default:
            return state;
    }
};