const populateCart = async (cart) => {
      return cart.populate([
            {
                  path: "items.perfume",
                  select: "name brand price images concentration size"
            },
            {
                  path: "user",
                  select: "name email"
            },
            {
                  path: "appliedCoupon",
                  select: "code discountPercentage"
            }
      ]);
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const emptyCartResponse = () => ({
      cart: null,
      totalItems: 0,
      totalQuantity: 0,
      pricing: {
            subtotal: 0,
            shipping: 0,
            discountPercentage: 0,
            discountAmount: 0,
            grandTotal: 0
      }
});


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const calculateCartPricing = (cart) => {
      const items = cart?.items || [];

      const subtotal = items.reduce(
            (acc, item) =>
                  acc + (item.perfume.price * item.quantity),
            0
      );

      const shipping =
            subtotal > 300 || subtotal === 0
                  ? 0
                  : 15;

      const discountPercentage =
            cart?.appliedCoupon?.discountPercentage || 0;

      const discountAmount =
            ((subtotal + shipping) * discountPercentage) / 100;

      const grandTotal =
            subtotal + shipping - discountAmount;

      return {
            subtotal: Number(subtotal.toFixed(2)),
            shipping: Number(shipping.toFixed(2)),
            discountPercentage,
            discountAmount: Number(discountAmount.toFixed(2)),
            grandTotal: Number(grandTotal.toFixed(2))
      };
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const normalizeCart = async (cart) => {
      if (!cart) return null;

      const totalQuantity = cart.items.reduce(
            (acc, item) => acc + item.quantity,
            0
      );

      if (totalQuantity === 0) {
            cart.items = [];
            cart.appliedCoupon = null;

            await cart.save();
      }

      return cart;
};

//////////////////////////////////////////////////////////////////////////////
const getCartResponse = (cart) => {
      const items = cart?.items || [];

      const totalItems = items.length;

      const totalQuantity = items.reduce(
            (acc, item) => acc + item.quantity,
            0
      );

      const pricing = calculateCartPricing(cart);

      return {
            cart: {
                  ...cart.toObject?.() || cart,
                  items
            },
            totalItems,
            totalQuantity,
            pricing
      };
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
const buildCartSnapshot = async (cart) => {
      cart = await normalizeCart(cart);
      cart = await populateCart(cart);

      const pricing = calculateCartPricing(cart);

      return {
            ...getCartResponse(cart),
            pricing
      };
};


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
export {
      calculateCartPricing,
      normalizeCart,
      getCartResponse,
      buildCartSnapshot,
      emptyCartResponse
} 