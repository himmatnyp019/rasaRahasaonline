import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './DeliveryAddress.css'
import AddAddressModal from './AddAddressModal/AddAddressModal';
import { useToast } from '../../context/ToastContext';


const DeliveryAddress = ({ addressData }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { showToast } = useToast()
  const [activeIndex, setActiveIndex] = useState(0)
  const [aIndex, setIndex] = useState(0)
  const { upadateAddress } = useContext(StoreContext)

  const handleAddressClick = (key) => {
    setSelectedKey(key);
    setIsEdit(false);
    setShowModal(true);
    setIndex(key)
  }

  const handleEditClick = (key) => {
    setIsEdit(true);
    setSelectedKey(key);
    setShowModal(true);
    setIndex(key)
  };
  if (!addressData) {
    addressData = [{}, {}, {}]
  }

  const handleSaveAddress = (fullAddress) => {
    console.log(fullAddress);
    showToast("The address saved successfully.")
  };
 const handleActiveAddress = (index , address) => {
    setActiveIndex(index);
    upadateAddress(index, address, true)
  }

  return (
    <div className="address-info">
      <div className="address-title-box">
        <h2 >Delivery address.</h2>
        <p className='title-slogen'>Use any one address while ordering.</p>
      </div>

      <div className="address-boxes">
        {[0, 1, 2].map((index) => {
          const item = addressData?.[index] || { address: "null", active: false };

          return (
            <div
              data-aos="fade-up"
              data-aos-delay={0 + index * 20}
              className={`address${index + 1}`}
              key={index}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }} >
              <h3 className={`address-lebel ${item.active ? "active" : ""}`}>
                Address {index + 1} :
              </h3>

              <div
                className={`address-box address-${index + 1}-box ${item.active ? "active-address" : ""
                  }`}>
                {item.address !== "null" ? (
                  <>
                    <p>{item.address}</p>
                    <p
                      className="edit-link"
                      onClick={(e) => {
                        handleEditClick(index);
                        e.stopPropagation(); // prevent parent click
                      }} >
                      <u>Edit address</u>
                    </p>

                    <div className="option" onClick={() => handleActiveAddress(index, item.address)}>

                    <input
                      type="radio"
                      value={index}
                      checked={item.active}
                      onChange={(e) => setActiveIndex(e.target.value)}
                      />
                    <span>{item.active?"Default address":"Mark as default"}</span>
                      </div>
                    
            </>
          ) : (
        <p onClick={() => handleAddressClick(index)}>
          Address Not Found! <br />
          <span>+ click to add</span>
        </p>
                )}
      </div>
    </div>
  );
})}

      </div >

  { showModal && (
    <AddAddressModal
      onClose={() => setShowModal(false)}
      onSave={handleSaveAddress}
      isEdit={isEdit}
      aIndex={aIndex}
    />
  )}
    </div >
  );
}

export default DeliveryAddress;
