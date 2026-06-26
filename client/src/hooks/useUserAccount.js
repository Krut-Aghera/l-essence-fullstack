import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addAddress, fetchAddresses, removeAddress, updateAddress } from '../apis/address.api';
import { logoutUser } from '../apis/auth.api';
import { updateUserDetail } from '../apis/user.api';
import { authstate__login, authstate__logout } from '../features/authSlice';
import { userstate__setAddress } from '../features/userSlice';
import { clearCartData, clearWishlist } from '../features/perfumeSlice';
import { showSuccessToast } from '../utils/hotToast';


export default function useUserAccount() {
      const navigate = useNavigate();
      const dispatch = useDispatch();

      // --- REDUX STATES ---
      const { userData } = useSelector(state => state.auth);
      const { wishlist } = useSelector(state => state.perfume);
      const { address } = useSelector(state => state.user);

      // --- LOCAL COMPONENT STATES ---
      const [isEditingProfile, setIsEditingProfile] = useState(false);
      const [isUpdatingAddress, setIsUpdatingAddress] = useState(false);
      const [editingAddressId, setEditingAddressId] = useState(null);
      const [showAddressForm, setShowAddressForm] = useState(false);
      // const [address, setAddress] = useState(null);
      const [isLoading, setIsLoading] = useState(true);

      // --- DERIVED MEMOIZED VALUES ---
      const registeredAt = userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : '';
      const membershipStatus = "Gold Membership";

      // --- REACT HOOK FORM FOR PROFILE ---
      const {
            register: registerProfile,
            handleSubmit: handleProfileSubmit,
            reset: resetProfile,
            formState: { errors: profileErrors }
      } = useForm({
            defaultValues: {
                  name: userData?.name || '',
                  email: userData?.email || '',
                  phone: userData?.phone || '',
            }
      });

      // --- REACT HOOK FORM FOR ADDRESSES ---
      const {
            register: registerAddress,
            handleSubmit: handleAddressSubmit,
            reset: resetAddress,
            formState: { errors: addressErrors }
      } = useForm();

      // Sync profile defaults if userData loads asynchronously
      useEffect(() => {
            if (userData) {
                  resetProfile({
                        name: userData.name,
                        email: userData.email,
                        phone: userData.phone,
                  });
            }
      }, [userData, resetProfile]);

      // --- INITIAL DATA FETCH ---
      useEffect(() => {
            const getAddress = async () => {
                  try {
                        setIsLoading(true);
                        const response = await fetchAddresses();
                        userstate__setAddress(response?.data?.address);
                  } catch (err) {
                        console.error("Failed to load address data:", err);
                  } finally {
                        setIsLoading(false);
                  }
            };
            getAddress();
      }, []);

      // --- PROFILE HANDLERS ---
      const profileSubmitHandler = async (data) => {
            try {
                  const response = await updateUserDetail(userData?._id, data?.name, data?.email, data?.phone)

                  console.log("Response:", response);
                  console.log("Response data:", response.data);
                  dispatch(authstate__login(response?.data))

                  showSuccessToast("Profile details updated successfully!");
                  setIsEditingProfile(false);
            } catch (error) {
                  console.error("Error updating profile:", error);
            }
      };

      const cancelProfileEditing = () => {
            resetProfile(); // Revert values to current Redux userData state
            setIsEditingProfile(false);
      };

      // --- ADDRESS HANDLERS ---
      const addressSubmitHandler = async (data) => {
            const addressData = {
                  name: userData.name.trim(),
                  phone: userData.phone.trim(),
                  pincode: data.pincode.trim(),
                  address: data.address.trim(),
                  city: data.city.trim(),
                  state: data.state.trim(),
                  country: data.country.trim()
            };

            try {
                  if (isUpdatingAddress) {
                        const response = await updateAddress(editingAddressId, addressData);
                        dispatch(userstate__setAddress(response?.data?.address));
                  } else {
                        const response = await addAddress(addressData);
                        dispatch(userstate__setAddress(response?.data?.address));
                  }

                  resetAddress();
                  setEditingAddressId(null);
                  setIsUpdatingAddress(false);
                  setShowAddressForm(false);
            } catch (error) {
                  console.error("Error handling address save:", error);
            }
      };

      const startEditingAddress = (targetAddress) => {
            resetAddress({
                  address: targetAddress.address,
                  city: targetAddress.city,
                  state: targetAddress.state,
                  pincode: targetAddress.pincode,
                  country: targetAddress.country
            });

            setEditingAddressId(targetAddress._id);
            setIsUpdatingAddress(true);
            setShowAddressForm(true); // Ensure form expands open automatically
      };

      const removeAddressHandler = async (addressID) => {
            try {
                  const response = await removeAddress(addressID);
                  dispatch(userstate__setAddress(response?.data?.address));
            } catch (error) {
                  console.error("Error removing address:", error.response || error);
            }
      };

      // --- AUTHENTICATION HANDLERS ---
      const handleLogout = async () => {
            try {
                  await logoutUser();
                  showSuccessToast(`${userData?.name || 'User'}, you are logged out.`);
                  dispatch(clearWishlist());
                  dispatch(clearCartData());
                  dispatch(authstate__logout());
                  navigate('/');
            } catch (error) {
                  console.error("Logout exception:", error.response || error);
            }
      };

      return {
            userData,
            wishlist,
            address,
            isLoading,
            registeredAt,
            membershipStatus,

            // Profile properties
            isEditingProfile,
            setIsEditingProfile,
            registerProfile,
            handleProfileSubmit,
            profileErrors,
            profileSubmitHandler,
            cancelProfileEditing,

            // Address form properties
            showAddressForm,
            setShowAddressForm,
            isUpdatingAddress,
            addressErrors,
            registerAddress,
            handleAddressSubmit,
            addressSubmitHandler,
            startEditingAddress,
            removeAddressHandler,
            resetAddress,
            setEditingAddressId,
            setIsUpdatingAddress,

            // Auth actions
            handleLogout
      };
}