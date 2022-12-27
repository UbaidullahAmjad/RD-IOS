
import {
    CHANGE_PRANCHISE,
    CHANGE_CATEGORY,
    CHANGE_PRODUCT,
    CHANGE_PAGE_NUMBER,
    CHANGE_NEXT_PAGE,
    CHANGE_DONUTS_DATA,
    CHANGE_CATEGORY_ID,
    CHANGE_LOADER
} from "./type"

import {
    getListSupplier,
    getAllCategory,
    getAllProduct,
    getAllProductCategory,
    getmoreProductofCategorybase

} from "../../Service/ServiceRequest"
import store from '..'
import { onOtherStatus } from "../../Service/Helper"
import { getRectify } from "./rectifyAction"

// Get all the suppliers 
export const franshiseGetSuppliers = (warning, internet) => {
    return async dispatch => {
        dispatch({ type: CHANGE_LOADER, payload: true })
        getListSupplier().then(response => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            if (response.status == 200) {
                console.log(response.data.alldata)
                dispatch({ type: CHANGE_PRANCHISE, payload: response.data.alldata })
            }
            else {
                onOtherStatus(response, dispatch)
            }
        })
            .catch(error => {
                dispatch({ type: CHANGE_LOADER, payload: false })
                onOtherStatus(error, dispatch, warning, internet)
                console.log(error);
            });
        store.dispatch(getRectify())

    }
}
// Get the Supplier Product
export const getSupplierProduct = (id, warning, internet) => {
    return async dispatch => {
        // dispatch({ type: CHANGE_CATEGORY_ID, payload: null })
        dispatch({ type: CHANGE_PAGE_NUMBER, payload: 1 })
        dispatch({ type: CHANGE_LOADER, payload: true })
        getAllProduct(id, 1).then(response => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            if (response.status == 200) {
                dispatch({ type: CHANGE_PRODUCT, payload: response.data?.products })
                dispatch({ type: CHANGE_NEXT_PAGE, payload: response.data?.pagination.has_next })

            }
        }).catch(error => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            onOtherStatus(error, dispatch, warning, internet)
            console.log("error", error);
        });
        // store.dispatch(getRectify())

    }
}
export const getMoreData = (id) => {
    return async dispatch => {
        if (store.getState().fransh.nextPage) {
            dispatch({ type: CHANGE_PAGE_NUMBER, payload: store.getState().fransh.pageNumber + 1 })
            getAllProduct(id, store.getState().fransh.pageNumber).then(response => {
                if (response.status == 200) {
                    let Product = [...store.getState().fransh.product]
                    let combine = Product.concat(response.data?.products)
                    dispatch({ type: CHANGE_PRODUCT, payload: combine })
                    dispatch({ type: CHANGE_NEXT_PAGE, payload: response.data?.pagination.has_next })

                }
            })
                .catch(error => {
                    console.log("error", error);
                });


        }
        else {
            return null
        }



    }
}
export const getCategoryProduct = (categoryid, supplierId) => {
    return async dispatch => {
        console.log("category id ", categoryid)
        console.log("supllier id ", supplierId)
        if (categoryid == "ALL") {
            store.dispatch(getSupplierProduct(supplierId))

        } else {
            dispatch({ type: CHANGE_CATEGORY_ID, payload: categoryid })
            dispatch({ type: CHANGE_PAGE_NUMBER, payload: 1 })
            dispatch({ type: CHANGE_LOADER, payload: true })
            getAllProductCategory(supplierId, 1, categoryid).then(response => {
                if (response.status == 200) {
                    dispatch({ type: CHANGE_LOADER, payload: false })
                    dispatch({ type: CHANGE_PRODUCT, payload: response.data?.products })
                    dispatch({ type: CHANGE_NEXT_PAGE, payload: response.data?.pagination.has_next })

                } else {
                    dispatch({ type: CHANGE_LOADER, payload: false })
                }
            }).catch(error => {
                dispatch({ type: CHANGE_LOADER, payload: false })
            })
        }
    }
}
export const getMoreProductOfCategory = (id) => {
    return async dispatch => {
        if (store.getState().fransh.nextPage) {
            dispatch({ type: CHANGE_PAGE_NUMBER, payload: store.getState().fransh.pageNumber + 1 })
            getmoreProductofCategorybase(id, store.getState().fransh.pageNumber, store.getState().fransh.categoryid).then(response => {
                if (response.status == 200) {
                    let Product = [...store.getState().fransh.product]
                    let combine = Product.concat(response.data?.products)
                    dispatch({ type: CHANGE_PRODUCT, payload: combine })
                    dispatch({ type: CHANGE_NEXT_PAGE, payload: response.data?.pagination.has_next })

                }
            })
                .catch(error => {
                    console.log("error", error);
                });


        }
        else {
            return null
        }



    }
}

//back from home remove data from product so when user will enter to another suppliers product list the previous supplier list will not show
export const onBackHome = () => {
    return async dispatch => {
        dispatch({ type: CHANGE_PRODUCT, payload: [] })
    }

}