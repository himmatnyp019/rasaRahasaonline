import axios from 'axios'

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
import food_11 from './food_11.png'
import food_12 from './food_12.png'
import food_13 from './food_13.png'
import food_14 from './food_14.png'
import food_15 from './food_15.png'
import food_16 from './food_16.png'
import food_17 from './food_17.png'
import food_18 from './food_18.png'
import food_19 from './food_19.png'
import food_20 from './food_20.png'
import food_21 from './food_21.png'
import food_22 from './food_22.png'
import food_23 from './food_23.png'
import food_24 from './food_24.png'
import food_25 from './food_25.png'
import food_26 from './food_26.png'
import food_27 from './food_27.png'
import food_28 from './food_28.png'
import food_29 from './food_29.png'
import food_30 from './food_30.png'
import food_31 from './food_31.png'
import food_32 from './food_32.png'
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
import profile_tomato from "./profile.png"
import dommy_profile from './dommy-profile.JPG'
import tick from './tick.png'
import bill_end from './bill-end.png'
import kakao_pay from './kakaoPay.jpg'
import card_pay from './cardPay.png'
import cash_pay from './cashPay.png'
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
import { useEffect } from 'react'
// import cloud_1 from "./cloud1.png"

// detail-main category
import vegetable from './ChatGPT Image Jul 31, 2025, 11_04_17 AM.png'
import meat from './ChatGPT Image Jul 31, 2025, 11_12_28 AM.png'
import species from './ChatGPT Image Jul 31, 2025, 01_37_20 PM.png'

export const assets = {
    logo,
    redirect,
    dommy_profile,
    bill_end,
    poster,
    tick,
    cash_pay,
    card_pay,
    kakao_pay,
    cart_tomato,
    search_tomato,
    home_tomato,
    profile_icon,
    profile_tomato,
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

export const menu_list = [
    {
        menu_name: "Kitchen",
        menu_image: menu_1
    },
    {
        menu_name: "Soya",
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
        menu_name: "Snacks",
        menu_image: menu_6
    },
    {
        menu_name: "Vegetable",
        menu_image: menu_7
    },
    {
        menu_name: "Non-Veg",
        menu_image: menu_8
    }]

export const food_list = [
    {
        _id: "1",
        name: "Greek salad",
        image: food_1,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    },
    {
        _id: "2",
        name: "Veg salad",
        image: food_2,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "3",
        name: "Clover Salad",
        image: food_3,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "4",
        name: "Chicken Salad",
        image: food_4,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Salad"
    }, {
        _id: "5",
        name: "Lasagna Rolls",
        image: food_5,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "6",
        name: "Peri Peri Rolls",
        image: food_6,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "7",
        name: "Chicken Rolls",
        image: food_7,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "8",
        name: "Veg Rolls",
        image: food_8,
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Rolls"
    }, {
        _id: "9",
        name: "Ripple Ice Cream",
        image: food_9,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "10",
        name: "Fruit Ice Cream",
        image: food_10,
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "11",
        name: "Jar Ice Cream",
        image: food_11,
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    }, {
        _id: "12",
        name: "Vanilla Ice Cream",
        image: food_12,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Deserts"
    },
    {
        _id: "13",
        name: "Chicken Sandwich",
        image: food_13,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    },
    {
        _id: "14",
        name: "Vegan Sandwich",
        image: food_14,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "15",
        name: "Grilled Sandwich",
        image: food_15,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "16",
        name: "Bread Sandwich",
        image: food_16,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Sandwich"
    }, {
        _id: "17",
        name: "Cup Cake",
        image: food_17,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "18",
        name: "Vegan Cake",
        image: food_18,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "19",
        name: "Butterscotch Cake",
        image: food_19,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "20",
        name: "Sliced Cake",
        image: food_20,
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Cake"
    }, {
        _id: "21",
        name: "Garlic Mushroom ",
        image: food_21,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "22",
        name: "Fried Cauliflower",
        image: food_22,
        price: 22,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "23",
        name: "Mix Veg Pulao",
        image: food_23,
        price: 10,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    }, {
        _id: "24",
        name: "Rice Zucchini",
        image: food_24,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pure Veg"
    },
    {
        _id: "25",
        name: "Cheese Pasta",
        image: food_25,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    },
    {
        _id: "26",
        name: "Tomato Pasta",
        image: food_26,
        price: 18,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "27",
        name: "Creamy Pasta",
        image: food_27,
        price: 16,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "28",
        name: "Chicken Pasta",
        image: food_28,
        price: 24,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Pasta"
    }, {
        _id: "29",
        name: "Buttter Noodles",
        image: food_29,
        price: 14,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "30",
        name: "Veg Noodles",
        image: food_30,
        price: 12,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "31",
        name: "Somen Noodles",
        image: food_31,
        price: 20,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }, {
        _id: "32",
        name: "Cooked Noodles",
        image: food_32,
        price: 15,
        description: "Food provides essential nutrients for overall health and well-being",
        category: "Noodles"
    }
]

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
    name: "Himmat Neupane",
    email: 'example@gmail.com',
    phone: "000 0000-21442",
    image: 'null',
    address1: "Busan, Nam-gu, K-pop 540-23",
    address2: 'Busan, dajoen, K-pop 540-23',
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