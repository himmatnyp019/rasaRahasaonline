import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './DeliveryAddress.css'
import AddAddressModal from './AddAddressModal/AddAddressModal';
import { useToast } from '../../context/ToastContext';


const DeliveryAddress = ({addressData}) => {
  const { user, setUser, deliveryAddress,activeAddress } = useContext(StoreContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const { showToast } = useToast()
  const [aIndex, setIndex] = useState(0)

  const handleAddressClick = (key) => {

    if (!user[key]) {
      setSelectedKey(key);
      setIsEdit(false);
      setShowModal(true);
      setIndex(key)
    } else {
      setUser((prev) => ({
        ...prev,
        activeAddress: user[key],
      }));

      let finalAddress = user[key]
      showToast(`The default address is : ${finalAddress}`);
    }
  };
  const handleEditClick = (key) => {
    setIsEdit(true);
    setSelectedKey(key);
    setShowModal(true);
    setIndex(key)
  };

  const handleSaveAddress = (fullAddress) => {
    setUser((prev) => ({
      ...prev,
      [selectedKey]: fullAddress,
      activeAddress: fullAddress,
    }));
    showToast("The address saved successfully.")

  };

  return (
    <div className="address-info">
      <div className="address-title-box">
        <h2 >Delivery address.</h2>
        <p className='title-slogen'>Use any one address while ordering.</p>
      </div>


<div className="address-boxes">
      { addressData && (
        addressData.map((item, index) => (
        <div
          data-aos="fade-up" data-aos-delay={0 + index * 20}
          className={`address${index + 1}`}
          key={index}
          style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
        >
          <h3 className={`address-lebel ${item.active ? "active" : ""}`}>
            Address {index + 1} :
          </h3>

          <div
            className={`address-box address-${index + 1}-box ${item.active ? "active-address" : ""}`}>
            {item.address !== "null" ? (
              <>
                <p>{item.address}</p>
                <p
                  className="edit-link"
                  onClick={(e) => {
                    handleEditClick(index);
                    e.stopPropagation(); // prevent parent click
                  }}
                >
                  <u>Edit address</u>
                </p>
              </>
            ) : (
              <p onClick={() => handleAddressClick(index)}>
                Address Not Found! <br />
                <span>+ click to add</span>
              </p>
            )}
          </div>
        </div>
      ))
      )
      }
</div>

      {showModal && (
        <AddAddressModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveAddress}
          isEdit={isEdit}
          aIndex={aIndex}

        />
      )}
    </div>
  );
};

export default DeliveryAddress;
