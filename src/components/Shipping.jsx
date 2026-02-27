import React from "react";
import FormField from "./FormField";

export default function Shipping({ formData, handleChange, shippingCountries, shippingStates, shippingCities, errors }) {
    return (
        <div className="shipping-container">
            <FormField
                label="First Name"
                name="shippingFirstName"
                value={formData.shippingFirstName}
                onChange={handleChange}
                required
                error={errors.shippingFirstName}
            />
            <FormField
                label="Last Name"
                name="shippingLastName"
                value={formData.shippingLastName}
                onChange={handleChange}
                required
                error={errors.shippingLastName}
            />
            {/* Address Type */}
            <div className="flede">
                <label>Address Type
                    <span className="required">*</span>
                </label>
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
                    error={errors.shippingCompanyName}
                    required
                />
            )}
            <FormField
                label="Shipping Address Line 1"
                name="shippingHouse"
                value={formData.shippingHouse}
                onChange={handleChange}
                placeholder="House number and street name"
                error={errors.shippingHouse}
                required
            />

            <FormField
                name="shippingAppartment"
                value={formData.shippingAppartment}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc."
                error={errors.shippingAppartment}
            />

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
                {errors.shippingCountry && <div className="error">{errors.shippingCountry}</div>}
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

                </select>
                {errors.shippingState && <div className="error">{errors.shippingState}</div>}
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
                {errors.shippingCity && <div className="error">{errors.shippingCity}</div>}
            </div>

            <FormField
                label="Zip Code"
                name="shippingPostalCode"
                value={formData.shippingPostalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
                error={errors.shippingPostalCode}
                required
            />

            <FormField
                label="Phone"
                name="shippingPhone"
                value={formData.shippingPhone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                error={errors.shippingPhone}
                required
            />
        </div>
    );
}