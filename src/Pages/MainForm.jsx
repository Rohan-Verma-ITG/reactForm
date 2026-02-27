import React, { useEffect, useState } from "react";
import Billing from "../components/Billing";
import Shipping from "../components/Shipping";
import Additional from "../components/Additional";
import { getAllCountries, getStatesByCountry, getCitiesByState } from "../api";
import { validateName, validateEmail } from "../Validation";

export default function MainForm() {
    const [formData, setFormData] = useState({
        // Billing
        firstName: "",
        lastName: "",
        addressType: "Commercial",
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
        shippingAddressType: "Commercial",
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
        getAllCountries((data) => {
            setCountries(data);
            setShippingCountries(data);
        });
    }, []);
    useEffect(() => {
        if (formData.country) {
            getStatesByCountry(formData.country, setStates, setFormData);
        }
    }, [formData.country]);
    useEffect(() => {
        if (formData.country && formData.state) {
            getCitiesByState(
                formData.country,
                formData.state,
                setCities,
                setFormData
            );
        }
    }, [formData.state]);
    useEffect(() => {
        if (!formData.shippingSame && formData.shippingCountry) {
            getStatesByCountry(
                formData.shippingCountry,
                setShippingStates,
                setFormData
            );
        }
    }, [formData.shippingCountry, formData.shippingSame]);
    useEffect(() => {
        if (
            !formData.shippingSame &&
            formData.shippingCountry &&
            formData.shippingState
        ) {
            getCitiesByState(
                formData.shippingCountry,
                formData.shippingState,
                setShippingCities,
                setFormData
            );
        }
    }, [formData.shippingState, formData.shippingSame]);


    const validateForm = (data) => {
        const newErrors = {};

        // Billing Name
        const firstNameError = validateName(data.firstName, "First Name");
        const lastNameError = validateName(data.lastName, "Last Name");

        if (firstNameError) newErrors.firstName = firstNameError;
        if (lastNameError) newErrors.lastName = lastNameError;

        // Email
        if (!/\S+@\S+\.\S+/.test(data.billingEmail)) {
            newErrors.billingEmail = "Invalid email format.";
        } else if (data.billingEmail !== data.confirmEmail) {
            newErrors.confirmEmail = "Emails do not match.";
        }

        // Billing Address
        if (!data.house.trim()) newErrors.house = "House is required.";
        if (!data.appartment.trim()) newErrors.appartment = "Appartment is required.";
        if (!data.country) newErrors.country = "Country is required.";
        if (!data.state) newErrors.state = "State is required.";
        if (!data.city) newErrors.city = "City is required.";
        if (!data.postalCode.trim()) newErrors.postalCode = "Postal Code is required.";
        if (!data.phone.trim()) newErrors.phone = "Phone is required.";
        if (!data.companyName.trim()) newErrors.companyName = "Company Name is required.";

        // Shipping (if different)
        if (!data.shippingSame) {
            const shippingFirstNameError = validateName(data.shippingFirstName, "Shipping First Name");
            const shippingLastNameError = validateName(data.shippingLastName, "Shipping Last Name");

            if (shippingFirstNameError) newErrors.shippingFirstName = shippingFirstNameError;
            if (shippingLastNameError) newErrors.shippingLastName = shippingLastNameError;

            if (!data.shippingHouse.trim()) newErrors.shippingHouse = "Shipping House is required.";
            if (!data.shippingAppartment.trim()) newErrors.shippingAppartment = "Shipping Appartment is required.";
            if (!data.shippingCountry) newErrors.shippingCountry = "Shipping Country is required.";
            if (!data.shippingState) newErrors.shippingState = "Shipping State is required.";
            if (!data.shippingCity) newErrors.shippingCity = "Shipping City is required.";
            if (!data.shippingPostalCode.trim()) newErrors.shippingPostalCode = "Shipping Postal Code is required.";
            if (!data.shippingPhone.trim()) newErrors.shippingPhone = "Shipping Phone is required.";
            if (!data.shippingCompanyName.trim()) newErrors.shippingCompanyName = "Shipping Company Name is required.";
        }

        // Additional
        if (!data.avoidDates?.trim()) {
            newErrors.avoidDates = "This field is required.";
        }

        const orderNotesError = validateName(data.orderNotes, "Order Notes");
        if (orderNotesError) newErrors.orderNotes = orderNotesError;

        if (!data.accountsPayableEmail.trim()) {
            newErrors.accountsPayableEmail = "Accounts Payable Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.accountsPayableEmail)) {
            newErrors.accountsPayableEmail = "Invalid email format.";
        }

        if (!data.digitalLicenseEmail.trim()) {
            newErrors.digitalLicenseEmail = "Digital License Administrator Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(data.digitalLicenseEmail)) {
            newErrors.digitalLicenseEmail = "Invalid email format.";
        }

        if (!data.districtConfirm) {
            newErrors.districtConfirm = "You must confirm your district.";
        }

        return newErrors;
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const updatedData = {
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        };

        setFormData(updatedData);

        const validationErrors = validateForm(updatedData);
        setErrors(validationErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        // Auto-sync shipping if same as billing
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
                <Shipping formData={formData} handleChange={handleChange} shippingCountries={shippingCountries} shippingStates={shippingStates} shippingCities={shippingCities} errors={errors} />
            )}
            <Additional formData={formData} handleChange={handleChange} errors={errors} />
            <button type="submit">Submit Order</button>
        </form>
    );
}
