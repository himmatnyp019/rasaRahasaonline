import axios from 'axios'


import logoMain from "./logo-image.png"
import basket_icon from './basket_icon.png'
import logo from './logo.png'
import header_img from './header_img.png'
import search_icon from './search_icon.png'
import menu_1 from './menu_1.png'
import menu_2 from './menu_2.png'
import menu_3 from './menu_3.png'
import menu_4 from './menu_4.png'
import menu_5 from './menu_5.png'
import menu_6 from './menu_6.png'
import menu_7 from './menu_7.png'
import menu_8 from './menu_8.png'
import menu_9 from './rice and grains.avif'
import menu_10 from './fruits.png'
import menu_11 from './Cans.jpg'
import menu_12 from './choccolates.jpg'
import menu_13 from './frozen foods.png'

import food_1 from './food_1.png'
import food_2 from './food_2.png'
import food_3 from './food_3.png'
import food_4 from './food_4.png'
import food_5 from './food_5.png'
import food_6 from './food_6.png'
import food_7 from './food_7.png'
import food_8 from './food_8.png'
import food_9 from './food_9.png'
import food_10 from './food_10.png'
import poster from './poster.jpg'
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import linkedin_icon from './linkedin_icon.png'
import facebook_icon from './facebook_icon.png'
import twitter_icon from './twitter_icon.png'
import cross_icon from './cross_icon.png'
import selector_icon from './selector_icon.png'
import rating_starts from './rating_starts.png'
import profile_icon from './profile_icon.png'
import bag_icon from './bag_icon.png'
import logout_icon from './logout_icon.png'
import parcel_icon from './parcel_icon.png'
import pointing_img from './stg.webp'
import redirect from "./redirect.png"
import chat from "./chat.png"
import help from "./help.png"
import back_design from "./unnamed.jpg"
import search from "./search.png"
import search_tomato from "./search_tomato.png"
import cart_tomato from "./cart.png"
import home_tomato from "./home.png"
import track_tomato from './truck.png'
import profile_tomato from "./profile.png"
import dommy_profile from './dommy-profile.JPG'
import tick from './tick.png'
import bill_end from './bill-end.png'
import kakao_pay from './kakaoPay.jpg'
import card_pay from './cardPay.jpg'
import cash_pay from './cashPay.jpg'
import checkbox from "./checkbox.png"
// ---imgs for vegetable section---
import veg_1 from "./ladies-finger.png"
import veg_2 from "./spanich.png"
import veg_3 from './lemon.webp'
import veg_4 from "./garlic.png"
import veg_5 from "./chilli.png"
import veg_6 from "./tomato.png"
import veg_7 from "./potato.png"
import veg_slide from "./vegeslide.png"
// import cloud_1 from "./cloud1.png"

import trackTruck from './tracktruck.gif'
// detail-main category
import vegetable from './ChatGPT Image Jul 31, 2025, 11_04_17 AM.png'
import meat from './ChatGPT Image Jul 31, 2025, 11_12_28 AM.png'
import species from './ChatGPT Image Jul 31, 2025, 01_37_20 PM.png'
import drinks from './Drinks Icon.png'
import notify_bell from './notification-bell.gif'
import cancelled_stamp from './cancelled.png'
export const assets = {
    logo,
    redirect,
    logoMain,
    dommy_profile,
    bill_end,
    notify_bell,
    poster,
    tick,
    drinks,
    trackTruck,
    cancelled_stamp,
    cash_pay,
    card_pay,
    kakao_pay,
    cart_tomato,
    search_tomato,
    home_tomato,
    profile_icon,
    profile_tomato,
    track_tomato,
    search,
    checkbox,
    basket_icon,
    back_design,
    chat,
    help,
    food_7,
    header_img,
    search_icon,
    rating_starts,
    add_icon_green,
    add_icon_white,
    remove_icon_red,
    app_store,
    play_store,
    pointing_img,
    linkedin_icon,
    facebook_icon,
    twitter_icon,
    cross_icon,
    selector_icon,
    profile_icon,
    logout_icon,
    bag_icon,
    parcel_icon,
    // ----- vege section
    veg_1,
    veg_2,
    veg_3,
    veg_4,
    veg_5,
    veg_6,
    veg_7,
    veg_slide,
    vegetable,
    meat,
    species
    // cloud_1
}

export const main_section = [
  {
    category: "vegetable",
    title: "Vegetables & Fruits",
    description: "Fresh produce from farm to table.",
    image: vegetable,
  },
  {
    category: "spices",
    title: "Spices & Masalas",
    description: "Aromatic spices to flavor your dishes.",
    image: species,
  },
  {
    category: "meat",
    title: "Meat & Fish",
    description: "Quality meats and fresh seafood.",
    image: meat,
  },
  {
    category: "drinks",
    title: "Drinks & Cans",
    description: "Refreshing beverages and canned goods.",
    image: vegetable,
  },
];


export const menu_list = [
    {
        menu_name: "Kitchen Items",
        menu_image: menu_1
    },
    {
        menu_name: "Soya,String Hoppers",
        menu_image: menu_2
    },
    {
        menu_name: "Species",
        menu_image: menu_3
    },
    {
        menu_name: "Noodles",
        menu_image: menu_4
    },
    {
        menu_name: "Tea",
        menu_image: menu_5
    },
    {
        menu_name: "Biscuit",
        menu_image: menu_6
    },
    {
        menu_name: "Vegetables",
        menu_image: menu_7
    },
    {
        menu_name: "Meat & Fish",
        menu_image: menu_8
    },
    {
        menu_name: "Grains & Rice",
        menu_image: menu_9
    },
    {
        menu_name: "Fruits",
        menu_image: menu_10
    },
    {
        menu_name: "Drinks & Cans",
        menu_image: menu_11
    },{
        menu_name: "Chocolate",
        menu_image: menu_12
    }, 
    {
        menu_name: "Roti, Paratha, Frozen",
        menu_image: menu_13
    }
]


export const food_list = []
export const our_product = [
    {
        _id: "1",
        name: "Korean Rice 20kg",
        image: food_4,
        image2: null,
        image3: null,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: "999"
    },
    {
        _id: "2",
        name: "Korean Rice 20kg",
        image: food_5,
        image2: null,
        image3: null,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: ""
    }, {
        _id: "3",
        name: "Korean Rice 20kg",
        image: food_1,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: ""
    }, {
        _id: "4",
        name: "Korean Rice 20kg",
        image: food_6,
        image2: null,
        image3: null,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: ""
    }, {
        _id: "5",
        name: "Korean Rice 20kg",
        image: food_7,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: "1999"
    }, {
        _id: "6",
        name: "Korean Rice 20kg",
        image: food_8,
        image2: null,
        image3: null,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: "1999"
    }, {
        _id: "7",
        name: "Korean Rice 20kg",
        image: food_9,
        image2: null,
        image3: null,
        price: 4500,
        description: "Food provides is the where thiere is no one in the world is demo no only this another lorem essential nutrients for overall health and well-being",
        category: "Salad"
        , discount: ""
    },
]
export const userInfo =
{
    name: "",
    email: 'example@gmail.com',
    phone: "000 0000-21442",
    image: 'null',
    address1: "",
    address2: '',
    address3: null,
    activeAddress: "",
    cart: [],
    policy_tick: "true",
    history: [],
    updatedAt: "2020202",
    addedAt: "2028948"
}

export const orderHistory = [{
    _id: "1",
    date: "2025-24-3 Tuesday",
    discount: 12300,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "16900",
    deliveryCharge: "3000",
    deliveryAddress: "Busan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "3",
    date: "2025-25-7, wednesday",
    discount: 0,
    items: [
        {
            name: "Onion 10Kg",
            price: "45000",
            quantity: "1"
        },
        {
            name: "Wheat Floor 5kg",
            price: "8000",
            quantity: "2"
        },
        {
            name: "Sprite Large ",
            price: "3200",
            quantity: "3"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
},
{
    _id: "2",
    date: "2025-05-9 ,Monday",
    discount: 0,
    items: [
        {
            name: "Rice 20kg",
            price: "20000",
            quantity: "3"
        },
        {
            name: "Wheat Floor 20kg",
            price: "5000",
            quantity: "2"
        },
        {
            name: "Red Bull ",
            price: "1200",
            quantity: "5"
        }
    ],
    totalPrice: "150000",
    deliveryCharge: "3000",
    deliveryAddress: "Ulsan South Korea",
    deliveredBy: "Rasa Rahasa"
}]

export const deliveryAddress = [
    {
        address: "Busan, Nam-gu, K-pop 540-23",
        active: true
    },
    {
        address: "Busan, dajoen, K-pop 540-23",
        active: false
    },
    {
        address: "null",
        active: false
    }
]