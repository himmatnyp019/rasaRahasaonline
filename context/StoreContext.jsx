import { createContext, useEffect, useState } from "react";
import { food_list, our_product, userInfo, orderHistory, deliveryAddress } from "../src/assets/assets";
import axios from "axios";

// ✅ Creating Context
export const StoreContext = createContext("null");

// ✅ Main Context Provider Component
const StoreContextProvider = (props) => {

    // ------------------------------ //
    // ✅ STATE MANAGEMENT
    // ------------------------------ //
    const [food_list, setFoodList] = useState([]);
    const [activeAddress, setActiveAddress] = useState(1);
    const [userData, setUserData] = useState({});
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const [langauge, setLanguage] = useState("English");

    const url = "http://localhost:5000";

    const savedAddress = localStorage.getItem("activeAddress");

    const [user, setUser] = useState({
        address1: userInfo.address1,
        address2: userInfo.address2,
        address3: userInfo.address3,
        activeAddress: savedAddress || "",
    });

    // ------------------------------ //
    // ✅ CART LOGIC
    // ------------------------------ //

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
        let totalAmount = 0;
        let amountBeforeDiscount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(product => product._id === item);
                amountBeforeDiscount += itemInfo.price * cartItems[item];
                totalAmount += itemInfo.price * cartItems[item] - (itemInfo.discount * cartItems[item]);
            }
        }

        return [totalAmount, amountBeforeDiscount];
    };

    // 🧾 Get total discount value
    const getTotalDiscount = () => {
        let totalDiscount = 0;

        for (let item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find(product => product._id === item);
                totalDiscount += itemInfo.discount * cartItems[item];
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

    // 🛒 Load user data from DB using token
    const loadUserData = async (token) => {
        try {
            const response = await axios.get(`${url}/api/user/get`, {
                headers: { token }
            });
            setUserData(response.data.user);
            localStorage.setItem("userInfo", response.data.user);

        } catch (error) {
            console.error("Error loading user data:", error.response?.data || error.message);
        }
    };



    //user address updating
    const upadateAddress = async (index, address, active) => {
        if (localStorage.getItem("token")) {
            await axios.post(`${url}/api/address/update`, {
                index,
                newAddress: {
                    address,
                    active
                }
            }, {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
        }
    };

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
        user,
        deliveryAddress,
        setUser,
        orderHistory,
        setCartItems,
        removeFromCart,
        getTotalCartAmount,
        getTotalDiscount,
        url,
        token,
        setToken,
        langauge,
        setLanguage,
        upadateAddress,
        userData,
        setUserData,
        userInfo,
        loadUserData
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
