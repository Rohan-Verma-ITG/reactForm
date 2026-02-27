import React from "react";
import FormField from "./FormField";

export default function Shipping({ formData, handleChange, shippingCountries, shippingStates, shippingCities }) {
    return (
        <div className="shipping-container">
            {/* <h2>Shipping Details</h2> */}

            <FormField
                label="First Name"
                name="shippingFirstName"
                value={formData.shippingFirstName}
                onChange={handleChange}
                required
            />

            <FormField
                label="Last Name"
                name="shippingLastName"
                value={formData.shippingLastName}
                onChange={handleChange}
                required
            />

            {/* Address Type */}
            <div className="flede">
                <label>Address Type</label>
                <div className="rad">
                    <div>
                        <input
                            type="radio"
                            id="shippingHome"
                            name="shippingAddressType"
                            value="Residential"
                            checked={formData.shippingAddressType === "Residential"}
                            onChange={handleChange}
                        />
                        <label htmlFor="shippingHome">Residential</label>
                    </div>
                    <div>

                        <input
                            type="radio"
                            id="shippingWork"
                            name="shippingAddressType"
                            value="Commercial"
                            checked={formData.shippingAddressType === "Commercial"}
                            onChange={handleChange}
                        />
                        <label htmlFor="shippingWork">Commercial</label>
                    </div>
                </div>
            </div>

            {formData.shippingAddressType === "Commercial" && (
                <FormField
                    label="Company Name"
                    name="shippingCompanyName"
                    value={formData.shippingCompanyName}
                    onChange={handleChange}
                    required
                />
            )}

            <FormField
                label="Shipping Address Line 1"
                name="shippingHouse"
                value={formData.shippingHouse}
                onChange={handleChange}
                placeholder="House number and street name"
                required
            />

            <FormField
                name="shippingAppartment"
                value={formData.shippingAppartment}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc."
            />

            {/* <div className="select-grid"> */}
            <div className="flede">
                <label htmlFor="shippingCountry">Country
                    <span className="required">*</span>
                </label>
                <select
                    name="shippingCountry"
                    id="shippingCountry"
                    value={formData.shippingCountry}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Country</option>
                    {shippingCountries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flede">
                <label htmlFor="shippingState">State
                    <span className="required">*</span>

                </label>
                <select
                    name="shippingState"
                    id="shippingState"
                    value={formData.shippingState}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select State</option>
                    {shippingStates.map((state) => (
                        <option key={state.iso2} value={state.iso2}>
                            {state.name}
                        </option>
                    ))}
                    <option value="Texas">Texas</option>
                </select>
            </div>

            <div className="flede">
                <label htmlFor="shippingCity">City
                    <span className="required">*</span>
                </label>
                <select
                    name="shippingCity"
                    id="shippingCity"
                    value={formData.shippingCity}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select City</option>
                    {shippingCities.map((city) => (
                        <option key={city.id} value={city.name}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flede">
                <label htmlFor="shippingPostalCode">Zip Code
                    <span className="required">*</span>
                </label>
                <input
                    type="text"
                    name="shippingPostalCode"
                    id="shippingPostalCode"
                    value={formData.shippingPostalCode}
                    onChange={handleChange}
                    required
                />
            </div>
            {/* </div> */}

            <FormField
                label="Phone"
                name="shippingPhone"
                value={formData.shippingPhone}
                onChange={handleChange}
                required
            />
        </div>
    );
}