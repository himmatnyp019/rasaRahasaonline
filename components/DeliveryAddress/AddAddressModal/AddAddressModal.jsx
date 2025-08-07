import React, { useState } from "react";
import "./AddAddressModal.css";
import { useContext } from "react";
import { StoreContext } from "../../../context/StoreContext";


const AddAddressModal = ({ onClose, onSave, isEdit,aIndex }) => {
 
  const {upadateAddress} = useContext(StoreContext);
 
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
    if (form.country==='' || form.city==='' || form.fullAddress==='' || form.streetNumber==='' || form.zipCode==='') {
        alert("Please enter all fields.")
    }else{
        const full = `${form.country} ${form.city} ${form.streetNumber} ${form.zipCode}, ${form.fullAddress}`.trim();
        onSave(full);
        upadateAddress(aIndex,full,true)
        console.log("index: ", aIndex, "address : ", full, "active :" ,true)
        onClose();
        
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{isEdit? "Edit your Delivery Address ":"Add your Delivery Address"}</h2>

        <input name="country" placeholder="Country" onChange={handleChange} required/>
        <input name="city" placeholder="City" onChange={handleChange} required/>
        <input name="streetNumber" placeholder="Street Number" onChange={handleChange} required/>
        <input name="fullAddress" placeholder="Full Address" onChange={handleChange} required/>
        <input name="zipCode" placeholder="Zip Code" onChange={handleChange} required/>

        <div className="modal-buttons">
          <button onClick={handleSubmit}>Save</button>
          <button onClick={onClose} className="cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressModal;
