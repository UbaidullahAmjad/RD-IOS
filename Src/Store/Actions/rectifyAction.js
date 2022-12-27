import {
    getRectifydata,
    removeRectifyservice,


} from "../../Service/ServiceRequest"
import {
    CHNAGE_RECTIFY,
    RECTIFY_CHANGE_PRODUCT,
    CHANGE_LOADER,
    RECTIFY_CHANGE_PAGE_NUMBER,
    RECTIFY_CHANGE_NEXT_PAGE,
    CHANGE_BTN_LOADER

} from "./type"
import store from '..'
import { getAllProduct, addtoDBRectifydata, confirmDBRectifydata } from "../../Service/ServiceRequest"
import { getorderDetail } from "./cartAction"
import { onOtherStatus } from "../../Service/Helper"


export const getRectify = () => {
    return async dispatch => {
        try {
            getRectifydata(store.getState().user?.userData?.id).then(resp => {
                if (resp.status == 200) {
                    dispatch({ type: CHNAGE_RECTIFY, payload: resp?.data?.all_data })
                }
            })

        } catch (error) {

        }
    }
}

export const removeRectifyItem = (data, sid, warning, internet) => {
    return async dispatch => {
        removeRectifyservice(data.order_id, data.product_id).then(resp => {
            if (resp.status == 200) {
                let rectifydata = [...store.getState().rectify.rectify]
                var newCart = []
                for (let i = 0; i < rectifydata.length; i++) {
                    if (sid == rectifydata[i]?.order?.supplier_id) {
                        const newData = rectifydata[i].order_items.filter((item, index) => {
                            return item.id != data.id
                        })
                        if (newData.length == 0) {

                        } else {
                            let newObj = { ...rectifydata[i] }
                            newObj["order_items"] = newData
                            newCart.push(newObj)
                        }
                    } else {
                        newCart.push(rectifydata[i])
                    }
                }
                dispatch({ type: CHNAGE_RECTIFY, payload: [...newCart] })
            }

        }).catch(e => {
            onOtherStatus(e, dispatch, warning, internet)
        })



    }

}

export const getrectifySupplierProduct = (id, warning, internet) => {
    return async dispatch => {

        dispatch({ type: RECTIFY_CHANGE_PAGE_NUMBER, payload: 1 })
        dispatch({ type: CHANGE_LOADER, payload: true })
        getAllProduct(id, 1).then(response => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            if (response.status == 200) {
                dispatch({ type: RECTIFY_CHANGE_PRODUCT, payload: response.data?.products })
                dispatch({ type: RECTIFY_CHANGE_NEXT_PAGE, payload: response.data?.pagination.has_next })

            }
        }).catch(error => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            onOtherStatus(error, dispatch, warning, internet)
            console.log("error", error);
        });
        store.dispatch(getRectify())

    }
}

export const addtoRectifyList = (product, navigation, warning, internet) => {
    return async dispatch => {
        var pid = []
        var qty = []
        var minqty = []
        for (let i = 0; i < product.order_items.length; i++) {
            pid.push(product.order_items[i].product_id)
            qty.push(product.order_items[i].quantity)
            minqty.push(product.order_items[i].min_quantity)

        }
        console.log(pid, qty, minqty, product.order.supplier_name)
        addtoDBRectifydata(product.order.supplier_name, pid, qty, minqty, store.getState().user.userData.id).then(async(resp) => {
            if (resp.status == 200) {
                dispatch({ type: CHNAGE_RECTIFY, payload: resp?.data?.rectify_data })
                 await store.dispatch(getRectify())
                navigation.goBack()

            }
        }).catch(e => {
            onOtherStatus(e, dispatch, warning, internet)

        })

    }

}

export const getMoreDataRectifySupplier = (id) => {
    return async dispatch => {
       
        if (store.getState().rectify.nextPage) {
            dispatch({ type: RECTIFY_CHANGE_PAGE_NUMBER, payload: store.getState().rectify.pageNumber + 1 })
            getAllProduct(id, store.getState().rectify.pageNumber).then(response => {
                if (response.status == 200) {
                    let Product = [...store.getState().rectify.rectifySupplierdata]
                    let combine = Product.concat(response.data?.products)
                    dispatch({ type: RECTIFY_CHANGE_PRODUCT, payload: combine })
                    dispatch({ type: RECTIFY_CHANGE_NEXT_PAGE, payload: response.data?.pagination.has_next })

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

export const confirmRectify = (item, warning, internet , navigation) => {
    return async dispatch => {
        dispatch({ type: CHANGE_LOADER, payload: true })
        confirmDBRectifydata(item?.order?.id, store.getState().user.userData.id).then(async (resp) => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            if (resp.status == 200) {
                await store.dispatch(getRectify())
                dispatch({ type: CHANGE_LOADER, payload: false })
                store.dispatch(getorderDetail(warning, internet))
                navigation.navigate('DrawerScreen' , {
                    screen:"OrderDetails"
                })
            }
        }).catch(e => {
            dispatch({ type: CHANGE_LOADER, payload: false })
            onOtherStatus(e, dispatch, warning, internet)

        })


    }
}