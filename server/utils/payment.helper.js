import { paymentMethods } from "../constants.js";

const getPaymentMethod = (payment) => {
    const paymentGroup = payment.payment_group?.toLowerCase();

    switch (paymentGroup) {
        case "upi":
            return paymentMethods.UPI;

        case "credit_card":
            return paymentMethods.CREDIT_CARD;

        case "debit_card":
            return paymentMethods.DEBIT_CARD;

        case "card":
            const cardType = payment.payment_method?.card?.card_type?.toLowerCase();

            return cardType === "credit" ? paymentMethods.CREDIT_CARD : paymentMethods.DEBIT_CARD;

        case "net_banking":
            return paymentMethods.NET_BANKING;

        case "wallet":
            return paymentMethods.WALLET;

        case "emi":
            return paymentMethods.EMI;

        case "cardless_emi":
            return paymentMethods.CARDLESS_EMI;

        case "paylater":
            return paymentMethods.PAY_LATER;

        default:
            return paymentMethods.UNKNOWN;
    }
};

export { getPaymentMethod };
