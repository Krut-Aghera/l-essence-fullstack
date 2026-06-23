export const paymentMethods = {
      UPI: "upi",
      CREDIT_CARD: "credit card",
      DEBIT_CARD: "debit card",
      NET_BANKING: "net banking",
      WALLET: "wallet",
      EMI: "emi",
      CARDLESS_EMI: "cardless emi",
      PAY_LATER: "pay later",
      UNKNOWN: "unknown"
}
export const paymentMethodEnums = Object.values(paymentMethods)

export const orderStatus = {
      "PENDING": "pending",
      "CONFIRMED": "confirmed",
      "SHIPPED": "shipped",
      "DELIVERED": "delivered",
      "CANCELLED": "cancelled"
}

export const orderStatusEnums = Object.values(orderStatus);



export const paymentStatus = {
      "PENDING": "pending",
      "SUCCESS": "successfull",
      "FAILED": "failed",
      "REFUNDED": "refunded"
}

export const paymentStatusEnums = Object.values(paymentStatus);




export const userRoles = {
      "CUSTOMER": "customer",
      "ADMIN": "admin"
}

export const userRoleEnums = Object.values(userRoles);

export const hashSaltRounds = 10;

export const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
}

export const tokenExpiry = {
      "ACCESS_TOKEN": 15 * 60 * 1000,
      "REFRESH_TOKEN": 10 * 24 * 60 * 60 * 1000
}

export const ImageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".avif"
]

export const ImageMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif"
]

export const gender = {
      "MALE": "male",
      "FEMALE": "female",
      "UNISEX": "unisex"
}

export const genderEnums = Object.values(gender)

export const ALLOWED_PERFUME_UPDATE_FIELDS = [
      "name",
      "brand",
      "category",
      "price",
      "oldPrice",
      "discount",
      "size",
      "gender",
      "concentration",
      "inStock"
]


export const ALLOWED_ADDRESS_FIELDS = [
      "name",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "pincode"
]

export const perfumeConcentration = {
      "EAU_FRAICHE": "eau fraîche",
      "EAU_DE_COLOGNE": "eau de cologne",
      "EAU_DE_TOILETTE": "eau de toilette",
      "EAU_DE_PARFUM": "eau de parfum",
      "PARFUM": "parfum",
      "EXTRAIT_DE_PARFUM": "extrait de parfum",
      "ELIXIR": "elixir"
}

export const perfumeConcentrationEnums = Object.values(perfumeConcentration)