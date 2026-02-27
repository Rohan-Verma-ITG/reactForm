const API_KEY =
  "e3e13f45fe6ba5ee09d63ecdb140c3c9ba764fbd42a27a3d25158e3f70bfd3cd";
const headers = {
  "X-CSCAPI-KEY": API_KEY,
  "Content-Type": "application/json",
};

const BASE_URL = "https://api.countrystatecity.in/v1";

export const getAllCountries = async (setCountries) => {
  try {
    const res = await fetch(`${BASE_URL}/countries`, { headers });

    if (!res.ok) throw new Error("Failed to fetch countries");

    const data = await res.json();
    console.log(data);

    setCountries(data);
  } catch (err) {
    console.error(err);
  }
};

export const getStatesByCountry = async (
  countryCode,
  setStates,
  setFormData,
) => {
  console.log(countryCode);

  try {
    const res = await fetch(`${BASE_URL}/countries/${countryCode}/states`, {
      headers,
    });

    if (!res.ok) throw new Error("Failed to fetch states");

    const data = await res.json();
    console.log(data);

    setStates(data);

    setFormData((prev) => ({
      ...prev,
      state: "",
      city: "",
    }));
  } catch (err) {
    console.error(err);
  }
};
export const getCitiesByState = async (
  countryCode,
  stateCode,
  setCities,
  setFormData,
) => {
  console.log("fel''''''''''''''''''");
  
  try {
    const res = await fetch(
      `${BASE_URL}/countries/${countryCode}/states/${stateCode}/cities`,
      { headers },
    );

    if (!res.ok) throw new Error("Failed to fetch cities");

    const data = await res.json();
    console.log(data);

    setCities(data);

    setFormData((prev) => ({
      ...prev,
      city: "",
    }));
  } catch (err) {
    console.error(err);
  }
};
