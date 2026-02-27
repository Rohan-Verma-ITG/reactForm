import React from "react";
import FormField from "./FormField";

export default function Billing({ formData, handleChange, countries, states, cities, errors }) {
    return (
        <div className="billing-container">
            <h2>Billing Details</h2>

            <FormField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                error={errors.firstName}
            />

            <FormField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
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
                            id="home"
                            name="addressType"
                            value="Residential"
                            checked={formData.addressType === "Residential"}
                            onChange={handleChange}
                        />
                        <label htmlFor="home">Residential</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            id="work"
                            name="addressType"
                            value="Commercial"
                            checked={formData.addressType === "Commercial"}
                            onChange={handleChange}
                        />
                        <label htmlFor="work">Commercial</label>
                    </div>
                </div>
            </div>

            {/* Conditional Company */}
            {formData.addressType === "Commercial" && (
                <FormField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    error={errors.companyName}
                />
            )}

            <FormField
                label="Billing Address Line 1"
                name="house"
                value={formData.house}
                onChange={handleChange}
                placeholder="House number and street name"
                error={errors.house}
                required
            />

            <FormField
                name="appartment"
                value={formData.appartment}
                onChange={handleChange}
                placeholder="Apartment, suite, unit, etc."
                error={errors.appartment}

            />

            {/* <div className="select-grid"> */}
            <div className="flede">
                <label htmlFor="country">Country
                    <span className="required">*</span>

                </label>
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country.iso2} value={country.iso2}>
                            {country.name}
                        </option>
                    ))}
                </select>
                {errors.country && <span className="error">{errors.country}</span>}
            </div>

            <div className="flede">
                <label htmlFor="state">State
                    <span className="required">*</span>
                </label>
                <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select State</option>
                    {states.map((state) => (
                        <option key={state.iso2} value={state.iso2}>
                            {state.name}
                        </option>
                    ))}
                </select>
                {errors.state && <span className="error">{errors.state}</span>}
            </div>

            <div className="flede">
                <label htmlFor="city">City
                    <span className="required">*</span>
                </label>
                <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                >

                    <option value="">Select City</option>
                    {cities.map((city) => (
                        <option key={city.iso2} value={city.iso2}>
                            {city.name}
                        </option>
                    ))}
                </select>
                {errors.city && <span className="error">{errors.city}</span>}
            </div>

            <div className="flede">
                <label htmlFor="postalCode">Zip Code
                    <span className="// required">*</span>
                </label>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                />
                {errors.postalCode && <span className="error">{errors.postalCode}</span>}
            </div>
            {/* </div> */}

            <FormField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
            />
        </div>
    );
}