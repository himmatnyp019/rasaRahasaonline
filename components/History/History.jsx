import React, { useContext, useState } from 'react'
import './History.css'
import { StoreContext } from '../../context/StoreContext'
import Bill from '../Bill/Bill'

const History = ({ count }) => {
  const { orderHistory } = useContext(StoreContext)
  const [showBill, setShowBill] = useState(false)
  const [thisData, setThisData] = useState(null)
  let historyCount = count;
  let isLastItem = false;


  return (
    <div className='order-history'>
      <div className="history-title-text">
        <h2>Your Order History</h2>
        <p>All the orders that you made till now are showing below.</p>
      </div>
      <div className="order-history-content">
        {

          orderHistory.slice(0, historyCount).map((key, index) => {
           
            return (
              <div data-aos="fade-up" className="order-history-box" key={index}>
                <h3>{key.date}</h3>

                <div className="history-items-list">
                  {key.items.map((item, idx) => (
                    <p key={idx}>{item.name} x{item.quantity},</p>
                  ))}
                </div>

                {index === historyCount - 1 && (
                  isLastItem = true
                )}

                <h5 className="history-total-price">Total Price: {key.totalPrice}₩</h5>
                <p className="history-delivery-address">Address: {key.deliveryAddress}</p>
                <p className="history-delivered-by"> by {key.deliveredBy}</p>
                <button
                  onClick={() => {
                    let data = {
                      name: "",
                      totalPrice:  orderHistory[index].totalPrice,
                      items2: orderHistory[index].items,
                      discount: orderHistory[index].discount,
                      items: null,
                      deliveryCharge: orderHistory[index].deliveryCharge,
                      date: orderHistory[index].date
                    };
                    setThisData(data)
                    setShowBill(true);
                  }
                  }
                  className="history-bill-show-btn">View bill</button>
              </div>
            );
          })
        }
     
       

        {
          showBill && (
            <div className="show-my-bill">
              <div className="my-bill-container">

                <Bill data={thisData}> </Bill>
              </div>
              <div onClick={() => setShowBill(false)} className="close-my-bill">
                close
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default History
