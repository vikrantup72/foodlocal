import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import Config from 'react-native-config';

// export const BASE_URL = Config.BASE_URL;
// export const BASE_URL = 'http://83.136.219.147/foods/';
// export const BASE_URL = 'http://141.136.42.227/';
// export const BASE_URL = 'http://get-cup.com/company/';
// export const BASE_URL = 'https://get-cup.com/company/';
export const BASE_URL = 'https://www.get-cup.com/company/'



//  const BASE_URL = 'https://92.205.28.185/';

export const fetchCategory = language => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/getCategoryList`,
    data: {language: language},
  })
    .then(response => {
      // console.log('fetchCategoryresponsea',response)
      return response;
    })
    .catch(error => {
      console.log('tfetchCategoryserrora', error);
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      return error;
    });
};

export const topRecommended = (category_id, language) => {
  console.log(category_id, language);
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/restaurants/top-recommended`,
    data: {category_id: category_id, language: language},
  })
    .then(response => {
      // console.log('topRestaurantsresponsea',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('topRestaurantserrora', error);

      return error;
    });
};

export const topTrending = (category_id, language) => {
  console.log(category_id, language);
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/restaurants/top-trending`,
    data: {category_id: category_id, language: language},
  })
    .then(response => {
      // console.log('topRestaurantsresponsea',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('toptrending', error);

      return error;
    });
};

export const promoList = language => {
  // console.log(language)
  return axios({
    method: 'post',
    url: `https://www.get-cup.com/company/api/v1/promo/list`,
    data: {language: language},
  })
    .then(response => {
      // console.log('promoListsresponsea',response.data)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('promoListserrora', error);

      return error;
    });
};

export const getCart = (
  token,
  restaurant_id,
  language,
  device_id,
  promo_applied_id,
) => {
  console.log('toekn', token);
  console.log('restaurant_id', restaurant_id);
  console.log('language', language);
  console.log('device_id', device_id);
  console.log('promo_applied_id', promo_applied_id);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/cart`,
    data: {
      token: token,
      restaurant_id: restaurant_id,
      language: language,
      device_id: device_id,
      promo_applied_id: promo_applied_id,
    },
  })
    .then(response => {
      // console.log('promoListsresponsea',response.data)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('promoListserrora', error);

      return error;
    });
};

export const restaurantsList = (
  category_id,
  language,
  token,
  latitude,
  longitude,
  user_id,
) => {
  console.warn('category_id', category_id);
  console.warn('language', language);
  console.warn('latitude', latitude);
  console.warn('token', token);

  console.warn('longitude', longitude);
  console.warn('user_id', user_id);

  console.log('restaurantsListsss', latitude, longitude);
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/restaurants/listbylat`,
    data: {
      category_id: category_id,
      language: language,
      token: token,
      // latitude: 28.621309,
      // longitude: 77.365471,
      latitude: latitude,
      longitude: longitude,
      user_id: user_id,
    },
  })
    .then(response => {
      // console.log('restaurantsListResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('restaurantsListError', error);

      return error;
    });
};

export const restaurantDetail = (restaurant_id, language) => {
  //console.log('restauranxzxzxzxt_id',restaurant_id)
  console.log('language', language);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/get-restaurant`,
    data: {restaurant_id: restaurant_id, language: language},
  })
    .then(response => {
      //  console.log('restaurantDetail',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('restaurantDetailerror', error);

      return error;
    });
};

export const menuList = (
  restaurant_id,
  language,
  token,
  device_id,
  categoryId,
) => {
  //console.log('restaurant_id',restaurant_id)
  console.log('language', language);
  console.log('token', token);
  console.log('device_id', device_id);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/menus/getMenuById`,
    data: {
      restaurant_id: restaurant_id,
      language: language,
      token: token,
      device_id: device_id,
      category_id: categoryId,
    },
  })
    .then(response => {
      // console.log('menuListResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('menuListError', error);

      return error;
    });
};

export const addOnMenuList = menu_id => {
  // console.log('menu_id', menu_id);
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/menu-addon-detail`,
    data: {menu_id: menu_id},
  })
    .then(response => {
      // console.log('addOnmenuList',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('addOnmenuList', error);

      return error;
    });
};

export const addCart = (
  restaurant_id,
  token,
  menu_id,
  device_id,
  addon_ids,
) => {
  console.log('restaurant_id', restaurant_id);
  console.log('token:', token);
  console.log('menu_id:', menu_id);
  console.log('device_id:', device_id);
  console.log('addon_id:', addon_ids);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/carts/addCart`,
    data: {
      restaurant_id: restaurant_id,
      token: token,
      menu_id: menu_id,
      device_id: device_id,
      addon_ids: addon_ids,
    },
  })
    .then(response => {
      console.log('addToCartResponse', response?.data);
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: error?.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('addToCartError', error);

      return error;
    });
};

export const removeCart = (restaurant_id, token, menu_id, device_id) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/carts/removeCart`,
    data: {
      restaurant_id: restaurant_id,
      token: token,
      menu_id: menu_id,
      device_id: device_id,
    },
  })
    .then(response => {
      // console.log('aremoveFromCartResponse',response)
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('removeFromCartError', error);

      return error;
    });
};

export const removeAllCart = device_id => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/cart/empty`,
    data: {device_id: device_id},
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('removeFromCartError', error);

      return error;
    });
};

export const menuCategory = (restaurant_id, language) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/menu-category-list`,
    data: {restaurant_id: restaurant_id, language: language},
  })
    .then(response => {
      //  console.log('menuCategory',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('menuCategory', error);

      return error;
    });
};

export const menuDetail = (
  restaurant_id,
  language,
  token,
  device_id,
  menuId,
) => {
  console.log('menuDetailrestaurant_id', restaurant_id);
  console.log('menuDetaillanguage', language);
  console.log('menuDetailtoken', token);
  console.log('menuDetaildevice_id', device_id);
  console.log('menuDetailmenuId', menuId);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/menus/detail`,
    data: {
      restaurant_id: restaurant_id,
      language: language,
      token: token,
      device_id: device_id,
      id: menuId,
    },
  })
    .then(response => {
      //  console.log('menuDetailaa',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('menuListError', error);

      return error;
    });
};

export const applyPromo = (token, promo_code) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/promo/apply`,
    data: {token: token, promo_code: promo_code},
  })
    .then(response => {
      // console.log('applyPromoResponse',response)

      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });

      return error;
    });
};

export const removePromo = (token, promo_code) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/promo/remove`,
    data: {token: token, promo_code: promo_code},
  })
    .then(response => {
      // console.log('removePromoResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('removePromoError', error);

      return error;
    });
};

export const addressListType = token => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/address-type-list`,
    data: {token: token},
  })
    .then(response => {
      // console.log('addressTypeListResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('addressTypeListError', error);

      return error;
    });
};

export const addressList = (token, language) => {
  console.log('token', token);
  console.log('language', language);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/address-list`,
    data: {token: token, language: language},
  })
    .then(response => {
      // Snackbar.show({
      //     text: response.data.message,
      //     duration: Snackbar.LENGTH_SHORT,
      //   });
      // console.log('addressListResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('addressListError', error);

      return error;
    });
};

export const addAddress = (
  token,
  address_type_id,
  address,
  address_arbic,
  latitude,
  longitude,
  map_address
  
) => {
  console.log('token', token);
  console.log('address_type_id', address_type_id);
  console.log('address', address);
  console.log('address_arbic', address_arbic);
  console.log('latitude', latitude);
  console.log('longitude', longitude);
  console.log('map_address', map_address);


  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/add-address`,
    data: {
      token: token,
      address_type_id: address_type_id,
      address: address,
      address_arbic: address_arbic,
      latitude: latitude,
      longitude: longitude,
      map_address:map_address
    },
  })
    .then(response => {
      // console.log('addAddressResponse',response)
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('addAddressError', error);

      return error;
    });
};

export const editAddress = (
  token,
  address,
  address_arbic,
  city,
  state,
  country,
  zipcode,
  address_type_id,
) => {
  console.log('token', token);
  console.log('address', address);
  console.log('address_arbic', address_arbic);
  console.log('city', city);
  console.log('state', state);
  console.log('country', country);
  console.log('zipcode', zipcode);
  console.log('address_type_id', address_type_id);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/edit-address`,
    data: {
      token: token,
      address: address,
      address_arbic: address_arbic,
      city: city,
      state: state,
      country: country,
      zipcode: zipcode,
      address_type_id: address_type_id,
    },
  })
    .then(response => {
      // console.log('editAddressResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('editAddressError', error);

      return error;
    })
    .finally(final => {
      return final;
    });
};

export const deleteAddress = (token, address_id) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/delete-address`,
    data: {token: token, address_id: address_id},
  })
    .then(response => {
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('deleteAddressError', error);

      return error;
    });
};

export const createOrderId = (token, country_code, amount, quantity) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/create-orderid`,
    data: {
      token: token,
      country_code: country_code,
      amount: amount,
      quantity: quantity,
    },
  })
    .then(response => {
      //    console.log('placeOrderResponse',response.data)
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('placeOrderResponse', error);

      return error;
    });
};

export const createOrderToken = (
  token,
  card_no,
  exp_month,
  exp_year,
  cvc,
  client_ip,
  order_no,
) => {
  // data: {
  //   token: token,
  //   card_no: 4508750015741019,
  //   exp_month: 7,
  //   exp_year: 2022,
  //   cvc: 100,
  //   client_ip: '192.168.1.20',
  //   order_no: 'ORD310122142',
  // },

  console.log('token', token);
  console.log('card_no', card_no);
  console.log('exp_month', exp_month);
  console.log('exp_year', exp_year);
  console.log('cvc', cvc);
  console.log('client_ip', client_ip);
  console.log('order_no', order_no);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/create-token`,
    data: {
      token: token,
      card_no: card_no,
      exp_month: exp_month,
      exp_year: exp_year,
      cvc: cvc,
      client_ip: client_ip,
      order_no: order_no,
    },
  })
    .then(response => {
      console.log('createOrderToken', response.data);
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: error.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('createOrderTokenWerror', error);

      return error;
    });
};

export const createChargeAmount = (
  token,
  payment_token,
  totalPrice,
  order_no,
  transaction_no,
) => {
  //  token.token.userToken,
  // orderToken,
  // totalPrice,
  // order_no,
  // 'TRANS3101224',
  console.log('token', token);
  console.log('topayment_tokenken', payment_token);
  console.log('totalPrice', totalPrice);
  console.log('order_no', order_no);
  console.log('transaction_no', transaction_no);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/charge-amount`,
    data: {
      token: token,
      payment_token: payment_token,
      amount: totalPrice,
      order_no: order_no,
      transaction_no: transaction_no,
    },
  })
    .then(response => {
      console.log('createChargeAmount', response.data);
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('createChargeAmountWerror', error.data);

      return error;
    });
};

export const placeOrder = (
  token,
  restaurant_id,
  promo_applied_id,
  payment_mode,
  instructions,
  user_address_id,
  scedule_date,
  deviceId,
) => {
  console.log('token', token);
  console.log('restaurant_id', restaurant_id);
  console.log('promo_applied_id', promo_applied_id);
  console.log('payment_mode', payment_mode);
  console.log('user_address_i', user_address_id);
  console.log('scedule_date', scedule_date);
  console.log('deviceId', deviceId);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/order-placed`,
    data: {
      token: token,
      restaurant_id: restaurant_id,
      promo_applied_id: promo_applied_id,
      payment_mode: payment_mode,
      delivery_instructions: instructions,
      user_address_id: user_address_id,
      scedule_date: scedule_date,
      device_id: deviceId,
    },
  })
    .then(response => {
      console.log('placeOrderResponse', response.data);

      {
        response?.data?.data?.status === 1
          ? Snackbar.show({
              text: response.data.message,
              duration: Snackbar.LENGTH_SHORT,
            })
          : null;
      }
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('placeOrderError', error);

      return error;
    });
};

export const orderList = (token, language) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/user/order-list`,
    data: {token: token, language: language},
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('orderListError', error);

      return error;
    });
};

export const orderDetail = (token, language, orderId) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/user/order-detail/${orderId}`,
    data: {token: token, language: language},
  })
    .then(response => {
      // console.log('placeOrderResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('orderDetailtError', error);

      return error;
    });
};

export const notificationList = (token, language) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/getNotification`,
    data: {token: token, language},
  })
    .then(response => {
      // console.log('placeOrderResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('orderDetailtError', error);

      return error;
    });
};

export const forgotPassword = email => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/forgotPassword`,
    data: {email: email},
  })
    .then(response => {
      // console.log('placeOrderResponse',response)
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('orderDetailtError', error);

      return error;
    });
};

export const addSubscription = (
  deviceId,
  menu_id,
  subscription_type,
  days,
  start_date,
  end_date,
  monthly_dates,
) => {
  console.log('deviceId', deviceId);
  console.log('menu_id', menu_id);

  console.log('subscription_type', subscription_type);
  console.log('days', days);
  console.log('start_date', start_date);
  console.log('end_date', end_date);
  console.log('monthly_dates', monthly_dates);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/carts/addSubscriptionInCart`,
    data: {
      device_id: deviceId,
      menu_id: menu_id,
      subscription_type: subscription_type,
      days: days,
      start_date: start_date,
      end_date: end_date,
      monthly_dates: monthly_dates,
    },
  })
    .then(response => {
      //  console.log('addSubscriptionplaceOrderResponse',response)
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('addSubscriptionError', error);

      return error;
    });
};

export const getSubscriptionList = (language, device_id) => {
  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/carts/getSubscriptionInCart`,
    data: {
      language: language,
      device_id: device_id,
    },
  })
    .then(response => {
      // console.log('restaurantsListResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('restaurantsListError', error);

      return error;
    });
};

export const filterRestaurant = (category_id, rating, language) => {
  console.log('category_id', category_id);
  console.log('rating', rating);

  console.log('language', language);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/restaurants/filter-restaurant`,
    data: {
      category_id: category_id,
      rating: rating,
      language: language,
    },
  })
    .then(response => {
      console.log('filterRestaurant', response.data);
      Snackbar.show({
        text: response.data.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('filterRestaurantError', error);

      return error;
    });
};

export const restaurentSearch = (token, language, search_rest) => {
  console.log('token', token);
  console.log('language', language);
  console.log('search_rest', search_rest);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/restaurants/search`,
    data: {token: token, language: language, search_rest: search_rest},
  })
    .then(response => {
      // console.log('placeOrderResponse',response)
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('orderDetailtError', error);

      return error;
    });
};

export const reorder = (token, order_no) => {
  console.log('order_no', order_no);

  return axios({
    method: 'post',
    url: `${BASE_URL}api/v1/users/reorder`,
    data: {token: token, order_no: order_no},
  })
    .then(response => {
      // console.log('placeOrderResponse',response)
      Snackbar.show({
        text: response?.data?.message,
        duration: Snackbar.LENGTH_SHORT,
      });
      return response;
    })
    .catch(error => {
      Snackbar.show({
        text: 'Something Went Wrong',
        duration: Snackbar.LENGTH_SHORT,
      });
      console.log('orderDetailtError', error);
      Snackbar.show({
        text: error?.message,
        duration: Snackbar.LENGTH_SHORT,
      });

      return error;
    });
};
