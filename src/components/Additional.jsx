import React from "react";
import FormField from "./FormField";

export default function Additional({ formData, handleChange,  }) {
    return (
        <div className="additional-container">
            <h2>Additional Information</h2>

            <FormField
                label="Billing Email"
                name="billingEmail"
                type="email"
                value={formData.billingEmail}
                onChange={handleChange}
                placeholder="Enter your billing email address"
                required
            />

            <FormField
                label="Confirm Email"
                name="confirmEmail"
                type="email"
                value={formData.confirmEmail}
                onChange={handleChange}
                placeholder="Confirm your billing email address"
                required
            />

            <p className="info-text">
                We use this email address to locate tax exemption certificates associated
                with your account. To receive tax exemption for this order, please ensure
                that your exemption certificate has been uploaded.
            </p>

            {/* <FormField
                label="In order to complete your order, someone will need to be onsite to receive the delivery. Please list any upcoming dates that we should avoid (i.e. school closures, holidays, summer vacation, etc.)*"
                name="avoidDates"
                type="textarea"
                value={formData.avoidDates}
                onChange={handleChange}
                placeholder="List any dates we should avoid"
                required
            /> */}
            <div className="flede">

                <label htmlFor="avoidDates">
                    In order to complete your order, someone will need to be onsite to receive the delivery. Please list any upcoming dates that we should avoid (i.e. school closures, holidays, summer vacation, etc.)
                    <span className="required">*</span>
                </label>
                <textarea name="avoidDates" id="avoidDates" value={formData.avoidDates || ""} onChange={handleChange} placeholder="Enter your vacation days here"></textarea>
            </div>
            {/* 
            <FormField
                label="Order Notes"
                name="orderNotes"
                type="text"
                value={formData.orderNotes}
                onChange={handleChange}
                placeholder="Let us know how you found out about us!"
            /> */}

            <div className="flede">

                <label htmlFor="orderNotes">
                    Order Notes
                    <span className="required">*</span>
                </label>
                <textarea name="orderNotes" id="orderNotes" value={formData.orderNotes || ""} onChange={handleChange}></textarea>
            </div>

            <FormField
                label="Accounts Payable Email "
                name="accountsPayableEmail"
                type="email"
                value={formData.accountsPayableEmail}
                onChange={handleChange}
                placeholder="(who should we send the invoice to?)"
                required
            />

            <FormField
                label="Digital License Administrator Email"
                name="digitalLicenseEmail"
                type="email"
                value={formData.digitalLicenseEmail}
                onChange={handleChange}
                placeholder="Enter digital license admin email"
                required
            />

            <div className=" checkbox-field">
                <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: "marketingConsent",
                                value: e.target.checked,
                            },
                        })
                    }
                />
                <label htmlFor="marketingConsent">
                    I agree to receive occasional emails and can unsubscribe at any time.
                </label>
            </div>

            <div className=" checkbox-field">
                <input
                    type="checkbox"
                    id="districtConfirm"
                    name="districtConfirm"
                    checked={formData.districtConfirm}
                    onChange={(e) =>
                        handleChange({
                            target: {
                                name: "districtConfirm",
                                value: e.target.checked,
                            },
                        })
                    }
                    required
                />
                <label htmlFor="districtConfirm">
                    I confirm this purchase is a District purchase for 7Edu Global Academy. If this information is not correct, please click here to update it.*
                </label>
            </div>
        </div>
    );
}