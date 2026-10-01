export const INDIAN_CITIES = [
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Kolkata",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Lucknow",
  "Chandigarh",
  "Bhubaneswar",
  "Indore",
  "Kochi",
  "Guwahati",
];

export const PAKISTANI_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Hyderabad",
];

const toOption = (value) => ({ value, label: value });

export const INDIAN_CITY_OPTIONS = INDIAN_CITIES.map(toOption);
export const PAKISTANI_CITY_OPTIONS = PAKISTANI_CITIES.map(toOption);

export const NATIONAL_CITY_OPTIONS = [
  ...INDIAN_CITIES,
  ...PAKISTANI_CITIES.filter((c) => !INDIAN_CITIES.includes(c)),
].map(toOption);

export const INTERNATIONAL_COUNTRIES_WITH_CAPITALS = [
  { country: "United States", capital: "New York / Washington" },
  { country: "United Kingdom", capital: "London" },
  { country: "United Arab Emirates", capital: "Dubai / Abu Dhabi" },
  { country: "Singapore", capital: "Singapore" },
  { country: "Germany", capital: "Berlin / Frankfurt" },
  { country: "Canada", capital: "Toronto / Ottawa" },
  { country: "Australia", capital: "Sydney / Melbourne" },
  { country: "Japan", capital: "Tokyo" },
  { country: "Saudi Arabia", capital: "Riyadh / Jeddah" },
  { country: "France", capital: "Paris" },
  { country: "Netherlands", capital: "Amsterdam" },
  { country: "Qatar", capital: "Doha" },
  { country: "Malaysia", capital: "Kuala Lumpur" },
  { country: "China", capital: "Shanghai / Beijing" },
  { country: "South Korea", capital: "Seoul" },
];

export const INTERNATIONAL_DESTINATION_OPTIONS =
  INTERNATIONAL_COUNTRIES_WITH_CAPITALS.map(({ country, capital }) =>
    toOption(`${country}, ${capital}`)
  );

export const getDestinationOptionsForShipmentType = (shipmentType) => {
  const norm = String(shipmentType || "").toLowerCase();
  return norm === "international"
    ? INTERNATIONAL_DESTINATION_OPTIONS
    : NATIONAL_CITY_OPTIONS;
};

export const isValidDestinationForShipmentType = (shipmentType, destination) =>
  !destination ||
  getDestinationOptionsForShipmentType(shipmentType).some(
    (o) => o.value === destination
  );
