const DELIVERY_TYPE_CHARGES = {
  standard: 0,
  sameDay: 150,
  overnight: 80,
};

/* -------------------------------------------------------------------------- */
/*                    National Category Charges                              */
/* -------------------------------------------------------------------------- */

const NATIONAL_CATEGORY_CHARGES = {
  documents: 100,
  electronics: 150,
  clothing: 0,
  fragile: 250,
  food: 120,
  medicine: 150,
  cosmetics: 100,
  books: 20,
  small_package: 100,
  large_package: 250,
  other: 0,
};

/* -------------------------------------------------------------------------- */
/*                 International Category Charges                            */
/* -------------------------------------------------------------------------- */

const INTERNATIONAL_CATEGORY_CHARGES = {
  documents: 700,
  electronics: 2000,
  clothing: 500,
  fragile: 3500,
  food: 1500,
  medicine: 1800,
  cosmetics: 1000,
  books: 500,
  small_package: 700,
  large_package: 3500,
  other: 0,
};

/* -------------------------------------------------------------------------- */
/*                           Calculate Cost                                  */
/* -------------------------------------------------------------------------- */

export const calculateCost = ({
  originCity,
  destinationCity,
  shipmentType,
  parcelCategory,
  deliveryType,
  parcelWeight,
}) => {
  /* ------------------------------------------------------------------------ */
  /*                              Validation                                  */
  /* ------------------------------------------------------------------------ */

  if (!originCity || !destinationCity) {
    throw new Error("Origin city and destination city are required");
  }

  if (!parcelWeight || parcelWeight <= 0) {
    throw new Error("Parcel weight must be greater than 0");
  }

  /* ------------------------------------------------------------------------ */
  /*                              Normalize                                   */
  /* ------------------------------------------------------------------------ */

  const normalizedShipmentType = shipmentType?.trim().toLowerCase();

  const normalizedCategory = parcelCategory?.trim().toLowerCase();

  const normalizedDeliveryType = deliveryType?.trim();

  /* ------------------------------------------------------------------------ */
  /*                         Same City Check                                  */
  /* ------------------------------------------------------------------------ */

  const isSameCity =
    originCity.trim().toLowerCase() === destinationCity.trim().toLowerCase();

  /* ------------------------------------------------------------------------ */
  /*                      Delivery Type Charge                                */
  /* ------------------------------------------------------------------------ */

  const deliveryTypeCharge = DELIVERY_TYPE_CHARGES[normalizedDeliveryType];

  if (deliveryTypeCharge === undefined) {
    throw new Error("Invalid delivery type");
  }

  /* ------------------------------------------------------------------------ */
  /*                         National Shipment                                */
  /* ------------------------------------------------------------------------ */

  if (normalizedShipmentType === "national") {
    const categoryCharge = NATIONAL_CATEGORY_CHARGES[normalizedCategory];

    if (categoryCharge === undefined) {
      throw new Error("Invalid parcel category");
    }

    const basePrice = isSameCity ? 50 : 100;

    const weightPrice = parcelWeight * 500;

    const parcelPrice =
      basePrice + weightPrice + categoryCharge + deliveryTypeCharge;

    return {
      shipmentType: "National",
      parcelCategory: normalizedCategory,
      parcelPrice,
    };
  }

  /* ------------------------------------------------------------------------ */
  /*                      International Shipment                              */
  /* ------------------------------------------------------------------------ */

  if (normalizedShipmentType === "international") {
    const categoryCharge = INTERNATIONAL_CATEGORY_CHARGES[normalizedCategory];

    if (categoryCharge === undefined) {
      throw new Error("Invalid parcel category");
    }

    let parcelPrice;

    /* ---------------------------------------------------------------------- */
    /*                        Base Weight Pricing                             */
    /* ---------------------------------------------------------------------- */

    if (parcelWeight <= 0.5) {
      parcelPrice = 7500;
    } else if (parcelWeight <= 1) {
      parcelPrice = 13500;
    } else {
      const extraKG = Math.ceil(parcelWeight - 1);

      parcelPrice = 13500 + extraKG * 7500;
    }

    /* ---------------------------------------------------------------------- */
    /*                       Category Adjustment                              */
    /* ---------------------------------------------------------------------- */

    parcelPrice += categoryCharge;

    /* ---------------------------------------------------------------------- */
    /*                     Delivery Type Charge                               */
    /* ---------------------------------------------------------------------- */

    parcelPrice += deliveryTypeCharge;

    return {
      shipmentType: "International",
      parcelCategory: normalizedCategory,
      parcelPrice,
    };
  }

  /* ------------------------------------------------------------------------ */
  /*                         Invalid Shipment                                 */
  /* ------------------------------------------------------------------------ */

  throw new Error("Invalid shipment configuration");
};
