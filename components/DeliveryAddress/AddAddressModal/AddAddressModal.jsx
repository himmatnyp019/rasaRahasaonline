import React, { useState } from "react";
import "./AddAddressModal.css";
import { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { useTranslation } from "react-i18next";

const AddAddressModal = ({ onClose, onSave, isEdit, aIndex }) => {

  const { upadateAddress } = useContext(StoreContext);
  const {t}=useTranslation();
  const [form, setForm] = useState({
    country: "",
    city: "",
    streetNumber: "",
    fullAddress: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (form.country === '' || form.city === '' || form.fullAddress === '' || form.streetNumber === '' || form.zipCode === '') {
      alert("Please enter all fields.")
    } else {
      const full = `${form.country} ${form.city} ${form.streetNumber} ${form.zipCode}, ${form.fullAddress}`.trim();
      onSave(full);
      upadateAddress(aIndex, full, true)
      onClose();
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit ? "Edit your Delivery Address " : "Add your Delivery Address"}</h2>

        <input name="country" placeholder={t("country")} onChange={handleChange} required />
        <input name="city" placeholder={t("city")} onChange={handleChange} required />
        <input name="streetNumber" placeholder={t("streetNumber")} onChange={handleChange} required />
        <input name="fullAddress" placeholder={t("fullAddress")} onChange={handleChange} required />
        <input name="zipCode" placeholder={t("zipCode")} onChange={handleChange} required />

        <div className="modal-buttons">
          <button onClick={handleSubmit}>{t("save")}</button>
          <button onClick={onClose} className="cancel">{t("cancel")}</button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
