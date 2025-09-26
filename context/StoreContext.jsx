import { createContext, useEffect, useState } from "react";
import { our_product, deliveryAddress } from "../src/assets/assets";
import axios from "axios";
import { isTokenExpired } from "../src/hooks/auth.js"
import { useScroll } from "framer-motion";
import { toast } from "react-toastify";
import i18n from "../src/i18n.js";

// ✅ Creating Context
export const StoreContext = createContext("null");

// ✅ Main Context Provider Component
const StoreContextProvider = (props) => {

    // ------------------------------ //
    // ✅ STATE MANAGEMENT
    // ------------------------------ //
    const [food_list, setFoodList] = useState([]);
    const [activeAddress, setActiveAddress] = useState("");
    const [orderHistory, setOrderHistory] = useState([]);
    const [activeLang, setActiveLang] = useState("");
    const [userData, setUserData] = useState({});
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [langauge, setLanguage] = useState("ko");
    const [historyItemsId, setHistoryItemsId] = useState([]);
    const [myMessage, setMyMessage] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [showDetails, setShowDetails] = useState({ id: "", name: "", price: "", description: "", image: "", image3: "", image2: "", category: "", discount: "" });
    const [productMsg, setProductMsg] = useState({
        productId: "",
        name: "",
        price: "",
        discount: "",
        image: ""
    });

    // const url = "https://sdsrasarahasa.vercel.app";
    const url = "http://localhost:5000"
    // ------------------------------ //
    // ✅ CART LOGIC
    // ------------------------------ //
    // handeling langauge for easy update

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setActiveLang(lng);
        localStorage.setItem("lang", lng);
        console.log(localStorage.getItem("lang"));
    };

    if (!activeLang) {
        if (localStorage.getItem("lang")) {
            setActiveLang(localStorage.getItem("lang"))
           changeLanguage(localStorage.getItem("lang"));
        }else(setActiveLang("en"))
    }
    // ➕ Add item to cart (local + backend)
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
        }
    };

    // ➖ Remove item from cart (local + backend)
    const removeFromCart = async (itemId) => {
        setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));

        if (token) {
            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    };

    // 🛒 Load Cart from DB using token
    const loadCartData = async (token) => {
        const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
        setCartItems(response.data.cart);
    };

    // 💰 Calculate cart totals [discounted total, original total]
    const getTotalCartAmount = () => {
        let amountBeforeDiscount = 0;
        let totalAmount = 0;
        let deliveryPrice = 3000;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(product => String(product._id) === String(item));

                if (itemInfo) {   // ✅ check before using
                    amountBeforeDiscount += itemInfo.price * cartItems[item];
                    totalAmount += (itemInfo.price - itemInfo.discount) * cartItems[item];

                    if (totalAmount >= 100000) {
                        deliveryPrice = 0;
                    }
                }
            }
        }

        return [totalAmount, amountBeforeDiscount, deliveryPrice];
    };

    // 🧾 Get total discount value
    const getTotalDiscount = () => {
        let totalDiscount = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(
                    product => String(product._id) === String(item)
                );

                if (itemInfo) { // ✅ safety check
                    totalDiscount += itemInfo.discount * cartItems[item];
                }
            }
        }

        return totalDiscount;
    };



    // ------------------------------ //
    // ✅ FOOD DATA FETCHING
    // ------------------------------ //
    const fetchFoodList = async () => {
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data);
    };


    // ------------------------------ //
    // ✅ USER DATA ACCESSING
    // ------------------------------ //
    //checking use login expired or not
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
            //   window.location.href = "/Login"; // redirect to login
        }
    }, []);

    // 🛒 Load user data from DB using token
    const loadUserData = async (token) => {
        try {
            const response = await axios.get(`${url}/api/user/get`, {
                headers: { token }
            });
            setUserData(response.data.user);
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            activeAddr(JSON.parse(localStorage.getItem("userInfo")))
        } catch (error) {
            console.error("Error loading user data:", error.response?.data || error.message);
        }
    };
    function activeAddr(parms) {
        const index = parms.address.findIndex(obj => obj.active === true);
        setActiveAddress(parms.address[index].address)
    }
    useEffect(() => {
        let savedData1 = localStorage.getItem("userInfo")
        if (savedData1) {
            let userInfo = JSON.parse(savedData1);
            if (userInfo.address.address) {
                let ThreeAddr = userInfo.address
                const index = ThreeAddr.findIndex(obj => obj.active === true)
                const activeAddr = ThreeAddr[index].address;
                setActiveAddress(activeAddr);
            }

        }

    }, [userData, activeAddress]);
    //user address updating
    const upadateAddress = async (index, address, active) => {
        let token = localStorage.getItem("token");

        if (token) {
            const res = await axios.post(`${url}/api/address/update`, {
                index,
                newAddress: {
                    address,
                    active
                }
            }, {
                headers: {
                    token
                }
            });
            if (res.data.success) {
                toast.success(" Default address updated.");
                loadUserData(token)
            }
        }
    };
    // 🛒 Load history of the user from DB using token
    const loadOrderHistory = async (token) => {
        const response = await axios.get(`${url}/api/history/get`, { headers: { token } })
        setOrderHistory(response.data.orderHistory);
        setHistoryItemsId(response.data.keys);
    }

    // ------------------------------ //
    // ✅ REVIEW LOGIC
    // ------------------------------ //

    //get all the review


    // ------------------------------ //
    // ✅ GET ALL MY CHAT MESSAGE
    // ------------------------------ //

    const loadMyMessage = async (token) => {
        const response = await axios.get(`${url}/api/chat/me`, { headers: { token } })
        setMyMessage(response.data.data);
    }
    // ------------------------------ //
    // ✅ GET ALL MY Orders
    // ------------------------------ //

    // ------------------------------ //
    // ✅ INIT DATA LOADING ON MOUNT
    // ------------------------------ //
    useEffect(() => {

        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
                await loadUserData(storedToken);
                await loadOrderHistory(storedToken);
                await loadMyMessage(storedToken)
                // await loadReviewData(storedToken);
            }
        }

        loadData();
    }, []);
    // ------------------------------  //
    //   ✅ CONTEXT VALUE EXPORT      //
    // ------------------------------ //

    const contextValue = {
        food_list,
        setFoodList,
        our_product,
        cartItems,
        addToCart,
        loadOrderHistory,
        loadCartData,
        deliveryAddress,
        activeAddress,changeLanguage,
        orderHistory,
        setCartItems,
        removeFromCart,
        getTotalCartAmount,
        getTotalDiscount,
        activeLang, setActiveLang,
        url,
        token,
        setToken,
        langauge,
        setLanguage,
        upadateAddress,
        userData,
        setUserData,
        loadUserData,
        setActiveAddress,
        historyItemsId,

        //message(chat)
        loadMyMessage,
        showDetails,
        setShowDetails,
        myMessage, showChat, setShowChat,
        productMsg, setProductMsg
    };

    // ------------------------------ //
    // ✅ RETURN PROVIDER
    // ------------------------------ //
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
