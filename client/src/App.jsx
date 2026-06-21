import { Outlet } from "react-router-dom"
import { LoginPage } from "./pages"
import { useEffect } from "react"
import { getCurrentUser } from "./apis/auth.api"
import { useDispatch, useSelector } from "react-redux"
import { authstate__loading, authstate__login, authstate__logout } from "./features/authSlice"
import { setupInterceptors } from "./apis/interceptor"
import store from "./store/store"
import { setCartData, setWishlist } from "./features/perfumeSlice"
import { fetchCart } from "./apis/cart.api"
import { fetchWishlist } from "./apis/wishlist.api"
import { fetchAddresses } from "./apis/address.api"
import { userstate__setAddress } from "./features/userSlice"

const App = () => {

      const dispatch = useDispatch()
      const { isLoggedIn } = useSelector(state => state.auth)

      useEffect(() => {
            const getMe = async () => {
                  getCurrentUser()
                        .then(userData => {
                              dispatch(authstate__login(userData.data))
                        })
                        .catch((err) => {
                              dispatch(authstate__logout())
                        })
                        .finally(() => {
                              dispatch(authstate__loading(false))
                        })
                  }
            getMe()
      }, [])



      useEffect(() => {
            if (!isLoggedIn) return;

            const fetchWishlistHandler = async () => {
                  try {
                        const response = await fetchWishlist();

                        dispatch(
                              setWishlist(response.data?.list || [])
                        );
                  } catch (error) {
                        console.log(error.response);
                  }
            }

            const fetchCartHandler = async () => {
                  try {
                        const response = await fetchCart();
                        dispatch(setCartData(response?.data))
                  } catch (error) {
                        console.log(error.response);
                  }
            };

            const fetchAddressHandler = async () => {
                  try {
                        const response = await fetchAddresses();
                        dispatch(userstate__setAddress(response?.data?.address));
                  } catch (error) {
                        console.log(error.response);
                  }
            };

            fetchWishlistHandler();
            fetchCartHandler();
            fetchAddressHandler()

      }, [isLoggedIn, dispatch]);

      setupInterceptors(store)
      return (
            <Outlet />
      )
}

export default App