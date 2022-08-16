const Images = [
  {image: require('../assets/food5.jpg')},
  {image: require('../assets/food2.jpg')},
  {image: require('../assets/food5.jpg')},
  {image: require('../assets/food2.jpg')},
  {image: require('../assets/food5.jpg')},
];

export default {
  result : 1,
  message : "Home screen data",
  data : {
    topHeader : [
      {
        id: '1',
        coordinate: {
          latitude: 22.6293867,
          longitude: 88.4354486,
        },
        title: `Ninja's`,
        deliveryTime: `delivery time`,
        description: `dessert`,
        image: Images[0].image,
        rating: 4,
        reviews: 99,
        time: `45 min`,
        categories: ['Restaurant', 'Hotel', 'Dineout'],
      },
      {
        id: '2',
        coordinate: {
          latitude: 22.6345648,
          longitude: 88.4377279,
        },
        title: 'Food king',
        deliveryTime: `delivery time`,
        description: `dessert`,
        image: Images[1].image,
        rating: 5,
        reviews: 102,
        time: `45 min`,
        categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
      },
      {
        id: '3',
        coordinate: {
          latitude: 22.6281662,
          longitude: 88.4410113,
        },
        title: 'Burger king',
        deliveryTime: `delivery time`,
        description: `dessert`,
        image: Images[2].image,
        rating: 3,
        reviews: 220,
        time: `45 min`,
        categories: ['Restaurant', 'Hotel', 'Dineout'],
      },
      {
        id: '4',
        coordinate: {
          latitude: 22.6341137,
          longitude: 88.4497463,
        },
        title: 'Raghav pizza',
        deliveryTime: `delivery time`,
        description: `dessert`,
        image: Images[3].image,
        rating: 4,
        reviews: 48,
        time: `45 min`,
        categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
      },
      {
        id: '5',
        coordinate: {
          latitude: 22.6292757,
          longitude: 88.444781,
        },
        title: 'pizza',
        description: `dessert`,
        deliveryTime: `delivery time`,
        image: Images[4].image,
        rating: 4,
        reviews: 178,
        time: `45 min`,
        categories: ['Restaurant', 'Hotel', 'Dineout'],
      },
      {
        id: '6',
        coordinate: {
          latitude: 22.6293867,
          longitude: 88.4354486,
        },
        title: 'Food king',
        description: `dessert`,
        deliveryTime: `delivery time`,
        image: Images[0].image,
        rating: 4,
        reviews: 99,
        time: `45 min`,
        categories: ['Restaurant', 'Hotel', 'Dineout'],
      },
      {
        id: '7',
        coordinate: {
          latitude: 22.6345648,
          longitude: 88.4377279,
        },
        title: 'maggie',
        deliveryTime: `delivery time`,
        description: `dessert`,
        image: Images[1].image,
        rating: 5,
        reviews: 102,
        time: `45 min`,
        categories: ['Restaurant', 'Fastfood Center', 'Snacks Corner'],
      }
    ],

    favourites : [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Pizza hut',
        image: require("../assets/food2.jpg")
    
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Pastsss Burger',
        image: require("../assets/food5.jpg")
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Burger',
        image: require("../assets/food2.jpg")
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d7',
        title: '444',
        image: require("../assets/food2.jpg")
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29dds7',
        title: 'sss',
        image: require("../assets/food2.jpg")
      }
    ],

    promoCodes : [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Ninzas food',
        image: require("../assets/coupon1.jpg")
    
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Raghav Pizza',
        image: require("../assets/coupon2.jpg")
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Roasted',
        image: require("../assets/coupon3.jpg")
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d7',
        title: 'Bhaavati',
        image: require("../assets/coupon2.jpg")
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29dds7',
        title: 'Ninza',
        image: require("../assets/coupon1.jpg")
      }
    ]
  }
}