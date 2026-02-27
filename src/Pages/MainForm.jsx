import React, { useEffect, useState } from "react";
import Billing from "../components/Billing";
import Shipping from "../components/Shipping";
import Additional from "../components/Additional";
import { getAllCountries, getStatesByCountry, getCitiesByState } from "../api";
import { validateName } from "../Validation";
export default function MainForm() {
    const [formData, setFormData] = useState({
        // Billing
        firstName: "",
        lastName: "",
        addressType: "",
        companyName: "",
        house: "",
        appartment: "",
        country: "",
        state: "",
        city: "",
        postalCode: "",
        phone: "",

        // Shipping
        shippingSame: false,
        shippingFirstName: "",
        shippingLastName: "",
        shippingAddressType: "",
        shippingCompanyName: "",
        shippingHouse: "",
        shippingAppartment: "",
        shippingCountry: "",
        shippingState: "",
        shippingCity: "",
        shippingPostalCode: "",
        shippingPhone: "",

        // Additional
        billingEmail: "",
        confirmEmail: "",
        avoidDates: "",
        orderNotes: "",
        accountsPayableEmail: "",
        digitalLicenseEmail: "",
        marketingConsent: false,
        districtConfirm: false,

    });
    const [errors, setErrors] = useState({});

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingStates, setShippingStates] = useState([]);
    const [shippingCities, setShippingCities] = useState([]);
    useEffect(() => {
        getAllCountries(setCountries);
        getAllCountries(setShippingCountries);
    }, []);

    useEffect(() => {
        if (formData.country) {
            getStatesByCountry(formData.country, setStates, setFormData);
            if (formData.shippingSame) {
                getStatesByCountry(formData.shippingCountry, setShippingStates, setFormData);
            }
            // getStatesByCountry(formData.shippingCountry, setShippingStates, setFormData);
        }
    }, [formData.country]);

    useEffect(() => {
        console.log(formData.country, formData.state);

        if (formData.country && formData.state) {
            getCitiesByState(formData.country, formData.state, setCities, setFormData);
            if (formData.shippingSame) {
                getCitiesByState(formData.shippingCountry, formData.shippingState, setShippingCities, setFormData);
            }
        }
      
    }, [formData.shippingState]);



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const firstNameError = validateName(formData.firstName, "First Name");

        const lastNameError = validateName(formData.lastName, "Last Name");

        const newErrors = {};
        if (firstNameError) newErrors.firstName = firstNameError;
        if (lastNameError) newErrors.lastName = lastNameError;
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        const finalData = formData.shippingSame
            ? {
                ...formData,
                shippingFirstName: formData.firstName,
                shippingLastName: formData.lastName,
                shippingAddressType: formData.addressType,
                shippingCompanyName: formData.companyName,
                shippingHouse: formData.house,
                shippingAppartment: formData.appartment,
                shippingCountry: formData.country,
                shippingState: formData.state,
                shippingCity: formData.city,
                shippingPostalCode: formData.postalCode,
                shippingPhone: formData.phone,
            }
            : formData;

        console.log("Final Submitted Data:", finalData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Billing formData={formData} handleChange={handleChange} countries={countries} states={states} cities={cities} errors={errors} />


            <div className="checkbox-field">
                <h2>Shipping Details</h2>
                <input
                    type="checkbox"
                    name="shippingSame"
                    checked={formData.shippingSame}
                    onChange={handleChange}
                />
                <label>Uncheck if shipping address is the same as billing address</label>
            </div>

            {!formData.shippingSame && (
                <Shipping formData={formData} handleChange={handleChange} shippingCountries={shippingCountries} shippingStates={shippingStates} shippingCities={shippingCities} />
            )}

            <Additional formData={formData} handleChange={handleChange} />

            <button type="submit">Submit Order</button>
        </form>
    );
}