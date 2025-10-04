import React, { useContext, useState } from 'react'
import './History.css'
import { StoreContext } from '../../context/StoreContext'
import Bill from '../Bill/Bill'
import { useTranslation } from 'react-i18next'

const History = ({ count }) => {
  const { orderHistory } = useContext(StoreContext)
  const [showBill, setShowBill] = useState(false)
  const [thisData, setThisData] = useState(null)
  const { t } = useTranslation();
  let historyCount = count;
  let isLastItem = false;

  // Function to get status badge color
  const getStatusColor = (index) => {
    const colors = ['delivered', 'processing', 'pending'];
    return colors[index % 3];
  };

  return (
    <div className='order-history'>
      {/* Enhanced Header Section */}
      <div className="history-header-wrapper">
        <div className="history-title-text">
          <div className="history-icon-wrapper">
            <svg className="history-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Your Order History</h2>
          <p>All the orders that you made till now are showing below.</p>
          <div className="history-stats">
            <div className="stat-item">
              <span className="stat-number">{orderHistory.length}</span>
              <span className="stat-label">Total Orders</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">{historyCount}</span>
              <span className="stat-label">Showing</span>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="order-history-content">
        {orderHistory.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>No Orders Yet</h3>
            <p>Your order history will appear here once you make your first purchase.</p>
          </div>
        ) : (
          orderHistory.slice(0, historyCount).map((key, index) => {
            return (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className={`order-history-box ${index === historyCount - 1 ? 'last-item' : ''}`}
                key={index}
              >
                {/* Order Header */}
                <div className="order-box-header">
                  <div className="order-number-badge">
                    <span className="order-hash">#</span>
                    <span className="order-id">{String(index + 1).padStart(4, '0')}</span>
                  </div>
                  <div className={`order-status-badge ${getStatusColor(index)}`}>
                    <span className="status-dot"></span>
                    <span className="status-text">Delivered</span>
                  </div>
                </div>

                {/* Order Date */}
                <div className="order-date-section">
                  <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3>{key.date}</h3>
                </div>

                {/* Items List */}
                <div className="history-items-section">
                  <h4 className="items-section-title">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16 11V7C16 5.89543 15.1046 5 14 5H10C8.89543 5 8 5.89543 8 7V11M3 11H21M5 11L6 20C6 20.5304 6.21071 21.0391 6.58579 21.4142C6.96086 21.7893 7.46957 22 8 22H16C16.5304 22 17.0391 21.7893 17.4142 21.4142C17.7893 21.0391 18 20.5304 18 20L19 11H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Order Items ({key.items.length})
                  </h4>
                  <div className="history-items-list">
                    {key.items.slice(0,3).map((item, idx) => (
                      <div key={idx} className="history-item-tag">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Details */}
                <div className="order-details-grid">
                  <div className="detail-item price-detail">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2V22M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="detail-content">
                      <span className="detail-label">Total Price</span>
                      <span className="detail-value price-value">₩{key.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="detail-item address-detail">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.657 16.657L13.414 20.9C13.039 21.275 12.529 21.487 12 21.487C11.471 21.487 10.961 21.275 10.586 20.9L6.343 16.657C5.22422 15.5381 4.46234 14.1127 4.15369 12.5608C3.84504 11.009 4.00349 9.40047 4.60901 7.93868C5.21452 6.4769 6.24179 5.22749 7.55548 4.34846C8.86918 3.46943 10.4158 3 12 3C13.5842 3 15.1308 3.46943 16.4445 4.34846C17.7582 5.22749 18.7855 6.4769 19.391 7.93868C19.9965 9.40047 20.155 11.009 19.8463 12.5608C19.5377 14.1127 18.7758 15.5381 17.657 16.657Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="detail-content">
                      <span className="detail-label">Delivery Address</span>
                      <span className="detail-value">{key.deliveryAddress}</span>
                    </div>
                  </div>

                  <div className="detail-item delivery-detail">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 16V6C13 5.46957 12.7893 4.96086 12.4142 4.58579C12.0391 4.21071 11.5304 4 11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V16C2 16.5304 2.21071 17.0391 2.58579 17.4142C2.96086 17.7893 3.46957 18 4 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16ZM13 16V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H19L22 13V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H19M13 16C13 16.5304 12.7893 17.0391 12.4142 17.4142C12.0391 17.7893 11.5304 18 11 18M13 16C13 15.4696 13.2107 14.9609 13.5858 14.5858C13.9609 14.2107 14.4696 14 15 14C15.5304 14 16.0391 14.2107 16.4142 14.5858C16.7893 14.9609 17 15.4696 17 16M11 18C11 18.5304 10.7893 19.0391 10.4142 19.4142C10.0391 19.7893 9.53043 20 9 20C8.46957 20 7.96086 19.7893 7.58579 19.4142C7.21071 19.0391 7 18.5304 7 18M11 18C11 17.4696 10.7893 16.9609 10.4142 16.5858C10.0391 16.2107 9.53043 16 9 16C8.46957 16 7.96086 16.2107 7.58579 16.5858C7.21071 16.9609 7 17.4696 7 18M7 18C7 18.5304 6.78929 19.0391 6.41421 19.4142C6.03914 19.7893 5.53043 20 5 20C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18M7 18C7 17.4696 6.78929 16.9609 6.41421 16.5858C6.03914 16.2107 5.53043 16 5 16C4.46957 16 3.96086 16.2107 3.58579 16.5858C3.21071 16.9609 3 17.4696 3 18M17 16C17 16.5304 17.2107 17.0391 17.5858 17.4142C17.9609 17.7893 18.4696 18 19 18M17 16C17 15.4696 17.2107 14.9609 17.5858 14.5858C17.9609 14.2107 18.4696 14 19 14C19.5304 14 20.0391 14.2107 20.4142 14.5858C20.7893 14.9609 21 15.4696 21 16M19 18C19 18.5304 19.2107 19.0391 19.5858 19.4142C19.9609 19.7893 20.4696 20 21 20C21.5304 20 22.0391 19.7893 22.4142 19.4142C22.7893 19.0391 23 18.5304 23 18M19 18C19 17.4696 19.2107 16.9609 19.5858 16.5858C19.9609 16.2107 20.4696 16 21 16C21.5304 16 22.0391 16.2107 22.4142 16.5858C22.7893 16.9609 23 17.4696 23 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="detail-content">
                      <span className="detail-label">Delivered By</span>
                      <span className="detail-value">{key.deliveredTo}</span>
                    </div>
                  </div>
                </div>

                {/* View Bill Button */}
                <button
                  onClick={() => {
                    let data = {
                      name: "",
                      totalPrice: orderHistory[index].totalPrice,
                      items2: orderHistory[index].items,
                      discount: orderHistory[index].discount,
                      items: null,
                      deliveryCharge: orderHistory[index].deliveryCharge,
                      date: orderHistory[index].date
                    };
                    setThisData(data)
                    setShowBill(true);
                  }}
                  className="history-bill-show-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  View Bill
                </button>

                {/* Decorative Elements */}
                <div className="order-box-decoration"></div>
              </div>
            );
          })
        )}

        {/* Bill Modal */}
        {showBill && (
          <div className="show-my-bill" onClick={() => setShowBill(false)}>
            <div className="my-bill-container" onClick={(e) => e.stopPropagation()}>
              <div className="bill-header">
                <button className="close-bill-btn" onClick={() => setShowBill(false)}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <Bill data={thisData}></Bill>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default History;