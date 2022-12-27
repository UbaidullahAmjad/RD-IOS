import API, {BASE_URL} from './API';
// import NetInfo from '@react-native-community/netinfo';
import {getToken} from './Token';
import axios from 'axios';
import store from '../Store';

export const CategoryImage = BASE_URL + 'assets/images/ProductImage/category/';
export const ProductImage = BASE_URL + 'assets/images/ProductImage/product/';

export const checkInternetConnection = () => {
  // NetInfo.fetch().then(state => {
  //   if (state.isConnected === false) {
  //     Toast.showWithGravity(
  //       'No internet connection',
  //       Toast.SHORT,
  //       Toast.BOTTOM,
  //     );
  //   }
  // });
};

export const getListSupplier = async () => {
  console.log(BASE_URL + 'suppliers');
  return await axios.get(BASE_URL + 'suppliers').then(Response => {
    return Response;
  });
};

export const userLogin = async (mobile, password) => {
  console.log(
    BASE_URL + `native-signin-pagee?email=${mobile}&password=${password}`,
  );
  return await axios
    .post(
      BASE_URL + `native-signin-pagee?email=${mobile}&password=${password}`,
      {
        headers: {},
      },
    )
    .then(response => {
      return response;
    });
};

export const editProfileservice = async (
  fullname,
  email,
  phone,
  password,
  id,
) => {
  console.log(BASE_URL + `profile-update`);
  return await axios
    .post(BASE_URL + `profile-update`, {
      name: fullname,
      id: id,
      email: email,
      phone: phone,
      password: password,
    })
    .then(response => {
      return response;
    });
};

export const userRegister = async (name, mobile, password) => {
  const body = {
    fname: name,
    lname: '',
    mobile: mobile,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/register',
    data: body,
  }).then(res => {
    return res;
  });
};

export const getAllCategory = async () => {
  console.log(BASE_URL + 'category');
  return await axios.get(BASE_URL + 'category').then(Response => {
    return Response;
  });
};

export const getConfirmCartDate = async (sid, userid) => {
  console.log(
    BASE_URL +
      `getConfirmedData?supplier_id=${sid}&customer_id=${userid}&store_id=${
        store.getState().user.storeUserSelectionValue
      }`,
  );
  // console.log(BASE_URL + `getConfirmedData1?id=${sid}&customer_id=${userid}`);
  return await axios
    .post(
      BASE_URL +
        `getConfirmedData?supplier_id=${sid}&customer_id=${userid}&store_id=${
          store.getState().user.storeUserSelectionValue
        }`,
    )
    .then(Response => {
      return Response;
    });
};

export const getAllProduct = async (id, pageNumber) => {
  console.log(BASE_URL + `supplierdetailss/${id}/${pageNumber}`);
  return await axios
    .get(
      BASE_URL +
        `supplierdetailss/${id}/${pageNumber}
  `,
    )
    .then(Response => {
      return Response;
    });
};

export const getRectifydata = async id => {
  console.log(BASE_URL + `rectifyy/?user_id=${id}`);
  return await axios
    .get(
      BASE_URL +
        `rectifyy/?user_id=${id}
  `,
    )
    .then(Response => {
      return Response;
    });
};

export const addtoDBRectifydata = async (
  name,
  pid,
  quantity,
  minqty,
  userid,
) => {
  console.log(
    BASE_URL +
      `rectify/add/${name}?product_id=[${pid}]&quantity=[${quantity}]&min_qty=[${minqty}]&user_id=${userid}}`,
  );
  return await axios
    .post(
      BASE_URL +
        `rectifyy/add/${name}?product_id=[${pid}]&quantity=[${quantity}]&min_qty=[${minqty}]&user_id=${userid}}
  `,
    )
    .then(Response => {
      return Response;
    });
};

export const confirmDBRectifydata = async (orderid, userid) => {
  console.log(
    BASE_URL + `confirm_rectifyy_orders?order_id=${orderid}&user_id=${userid}`,
  );
  return await axios
    .get(
      BASE_URL +
        `confirm_rectifyy_orders?order_id=${orderid}&user_id=${userid}
  `,
    )
    .then(Response => {
      return Response;
    });
};

export const removeRectifyservice = async (orderid, id) => {
  console.log(BASE_URL + `removerectifyy/${orderid}/${id}`);
  return await axios
    .get(
      BASE_URL +
        `removerectifyy/${orderid}/${id}
  `,
    )
    .then(Response => {
      return Response;
    });
};

export const getAllProductCategory = async (
  supplierId,
  pageNumber,
  categoryid,
) => {
  console.log(
    BASE_URL + `productbycats/${supplierId}/${categoryid}/${pageNumber}`,
  );
  return await axios
    .get(
      BASE_URL +
        `productbycats/${supplierId}/${categoryid}/${pageNumber}
  `,
    )
    .then(Response => {
      return Response;
    });
};

export const getmoreProductofCategorybase = async (
  id,
  pageNumber,
  categoryid,
) => {
  console.log(BASE_URL + `productbycats/${id}/${categoryid}/${pageNumber}`);
  return await axios
    .get(
      BASE_URL +
        `productbycats/${id}/${categoryid}/${pageNumber}
  `,
    )
    .then(Response => {
      return Response;
    });
};

// export const addtoCartService = async (productid, quantity, minquantity, userid) => {

//   var formdata = new FormData();
//   formdata.append("product_id", `[${productid}]`);
//   formdata.append("quantity", ` [${quantity}]`);
//   formdata.append("min_qty", `[${minquantity}]`);
//   formdata.append("user_id", `${userid}`);
//   console.log(formdata)
//   var requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
//   };

//   return await fetch(BASE_URL + 'cart/add/item', requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
// };

export const confirmCartservice = async (
  pid,
  qty,
  minqty,
  userid,
  sid,
  total,
  value,
  msg,
) => {
  console.log(
    BASE_URL +
      `submitDeliveryData?quantity=[${qty}]&min_qty=[${minqty}]&product_id=[${pid}]&customer_id=${userid}&delivery_date=${value}&message=${msg}&supplier_id=${sid}&total=${total}&store_id=${
        store.getState().user.storeUserSelectionValue
      }`,
  );
  return await axios
    .post(
      BASE_URL +
        `submitDeliveryData?quantity=[${qty}]&min_qty=[${minqty}]&product_id=[${pid}]&customer_id=${userid}&delivery_date=${value}&message=${msg}&supplier_id=${sid}&total=${total}&store_id=${
          store.getState().user.storeUserSelectionValue
        }
  `,
      {
        headers: {},
      },
    )
    .then(Response => {
      return Response;
    });
};

export const remvoveItemCart = async (cartid, productid) => {
  return await axios
    .get(BASE_URL + `carts/item/remove/${cartid}/${productid}`)
    .then(Response => {
      return Response;
    });
};
export const getNewProducts = async () => {
  return await API({
    method: 'POST',
    url: 'api/v1/newProduct',
    data: {token: await getToken()},
  }).then(res => {
    return res;
  });
};
export const getPopularProducts = async () => {
  return await API({
    method: 'POST',
    url: 'api/v1/homepage',
    data: {token: await getToken()},
  }).then(res => {
    return res;
  });
};

export const getProductList = async categoryName => {
  return await API({
    method: 'POST',
    url: 'api/v1/getlist',
    data: {token: await getToken(), categry: categoryName},
  }).then(res => {
    return res;
  });
};

export const updateUser = async user => {
  return await API({
    method: 'POST',
    url: 'api/v1/updateUser',
    data: user,
  }).then(res => {
    return res;
  });
};
export const searchProduct = async text => {
  return await API({
    method: 'GET',
    url: `api/v1/product/search?s=${text}`,
  }).then(res => {
    return res;
  });
};

export const orderPlace = async orderDetails => {
  return await API({
    method: 'Post',
    url: 'api/v1/placeorder',
    data: orderDetails,
  }).then(res => {
    return res;
  });
};
export const getOrderDetails = async id => {
  console.log(BASE_URL + `getmyorders?user_id=${id}`);
  return await axios
    .get(BASE_URL + `getmyorders?user_id=${id}`)
    .then(Response => {
      return Response;
    });
};

export const forgotPassword = async mobile => {
  const body = {
    mobile: mobile,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/forgot_password',
    data: body,
  }).then(res => {
    return res;
  });
};

export const resetPassword = async (otp, password) => {
  const body = {
    otp: otp,
    password: password,
  };
  return await API({
    method: 'POST',
    url: 'api/v1/reset_password',
    data: body,
  }).then(res => {
    return res;
  });
};
