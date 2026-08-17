const DELIVERY_TYPE_CHARGES = {
  standard: 0,
  sameDay: 150,
  overnight: 80,
};

// National shipment category adjustments
const NATIONAL_CATEGORY_CHARGES = {
  document: 100,
  electronics: 150,
  fragile: 250,
  clothing: 0,
  food: 120,
  medicine: 150,
  cosmetics: 100,
  books: 20,
  small_package: 100,
  large_package: 250,
};

// International shipment category adjustments (higher charges)
const INTERNATIONAL_CATEGORY_CHARGES = {
  document: 700,
  electronics: 2000,
  fragile: 3500,
  clothing: 500,
  food: 1500,
  medicine: 1800,
  cosmetics: 1000,
  books: 500,
  small_package: 700,
  large_package: 3500,
};

export const calculateCost = ({
  originCity,
  destinationCity,
  shipmentType,
  parcelCategory,
  deliveryType,
  parcelWeight,
}) => {
  const isSameCity =
    originCity.trim().toLowerCase() === destinationCity.trim().toLowerCase();

  const deliveryTypeCharge = DELIVERY_TYPE_CHARGES[deliveryType] || 0;

  // National shipment cost calculation
  if (shipmentType === "national") {
    const categoryCharge = NATIONAL_CATEGORY_CHARGES[parcelCategory] || 0;

    if (isSameCity) {
      const basePrice = 50;
      const weightPrice = parcelWeight * 500;
      const price =
        basePrice + weightPrice + categoryCharge + deliveryTypeCharge;

      return {
        type: "national",
        parcelCategory,
        price,
      };
    }

    // out of city
    const basePrice = 100;
    const weightPrice = parcelWeight * 500;
    const price = basePrice + weightPrice + categoryCharge + deliveryTypeCharge;

    return {
      type: "national ",
      parcelCategory,
      price,
    };
  }

  // International shipment calculation
  if (shipmentType === "international") {
    const categoryCharge = INTERNATIONAL_CATEGORY_CHARGES[parcelCategory] || 0;

    if (parcelWeight <= 0) {
      throw new Error("Parcel weight must be greater than 0");
    }

    let price;
    if (parcelWeight <= 0.5) {
      price = 7500;
    } else if (parcelWeight <= 1) {
      price = 13500;
    } else {
      const extraKG = Math.ceil(parcelWeight - 1);
      price = 13500 + extraKG * 7500;
    }
    price = price + categoryCharge;

    return {
      type: "international",
      parcelCategory,
      price,
    };
  }
  throw new Error("Invalid shipment configuration");
};
