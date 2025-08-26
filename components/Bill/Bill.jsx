import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Bill.css'
import html2canvas from 'html2canvas'
import { useToast } from '../../context/ToastContext';


const Bill = ({data, setShowBill}) => {
    const { userData,food_list } = useContext(StoreContext)
    
    if (!data) {
        return null
    }
    console.log(data);
    
    if (JSON.stringify(data)==="[]") {
        return null
    }
  const {showToast} = useToast()
    let totalPrice = 0;
    let totalQuantity = 0;
    let cartItems = data.items? data.items:"";
    
const handleScreenshot = async () => {
  const element = document.getElementById('screenshot-content');
  if (!element) return;

  // Save original styles to restore later
  const originalHeight = element.style.height;
  const originalOverflow = element.style.overflow;

  // Get full content dimensions
  const width = element.scrollWidth;
  const height = element.scrollHeight;

  // Expand element temporarily to show full content
  element.style.height = `${height}px`;
  element.style.overflow = 'visible';

  // Give browser time to apply styles (optional but helps)
  await new Promise(resolve => setTimeout(resolve, 50));

  // ⛳️ THIS is where the canvas is created
  const canvas = await html2canvas(element, {
    useCORS: true,
    width,
    height,
    windowWidth: width,
    windowHeight: height,
    scrollX: 0,
    scrollY: 0,
    backgroundColor: null,
  });

  // Restore original styles
  element.style.height = originalHeight;
  element.style.overflow = originalOverflow;

  // Save image
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `screenshot-${Date.now()}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("The image has been saved to device.")
};

 
  return (
    
    <div className='background'>
        <center>
            <div className="bill-btns">
            {data.items?<p className='close-bill' onClick={()=>setShowBill(false)}>X</p>:<></>
                }
            <p className='print-bill' >Print Receipt</p>
            <p onClick={handleScreenshot} className='screenshot-bill'>Take Screenshot</p>

            </div>
            </center>
    <div className='bill-container' id="screenshot-content">

        <div className="bill-top-contents">
            <br />
            <h2>----------Payment Receipt--------</h2>
            <br />
            <hr />
            <br />
            <h3>Name : <span>........{userData.name}....... </span> </h3>
            <h3>Phone Number : <span>........{userData.phone}.......</span> </h3>
            <h3>Total Amount : <span>........{data.totalPrice + data.deliveryCharge}.........</span> </h3>
            <h3>Date : <span>.......{data.date}........</span> </h3>
            <br />
            <hr />
            <hr />
            <br />
        </div>
        <div className="bill-items-table">
            <div className="bill-items-title item-table">
                <p>Name</p>
                <p>Quantity</p>
                <p>Amount</p>
            </div>
            <hr />
            <br />
            <div className="bill-items">
                {
                    data.items?
                        food_list.map((item, index)=>{
                            if(cartItems[item._id]>0){
                                totalQuantity += cartItems[item._id];
                                totalPrice += Number(item.price)* cartItems[item._id];
                                  return(
                            <div className='item-table'>
                            <p>{item.name}</p>
                            <p>{cartItems[item._id]}</p>
                            <p>{item.price} ₩</p>
                            </div>
                        )
                            }
                        })
                    :data.items2.map((item,index)=>{
                        totalPrice += Number(item.price)*Number(item.quantity)
                        return(
                             <div className='item-table'>
                            <p>{item.name}</p>
                            <p>{item.quantity}</p>
                            <p>{item.price *Number(item.quantity) } ₩</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
            <br />
            <br />
            <div className="item-table">
                <p>Total</p>
                <p>{totalQuantity}</p>
                <p>{totalPrice} ₩</p>
            </div>
            <div className="item-table">
                <p>Discount</p>
                <p>---</p>
             <p>{data.discount} ₩</p>
            </div>
            <div className="item-table">
                <p>DeliveryCharge</p>
                <p>---</p>
                <p>{data.deliveryCharge} ₩</p>
            </div>
            <br />
            <hr />
            <hr />
            <br />
            <div className="item-table">
                <p>Final Amount</p>
                <p>---</p>
                <p>{totalPrice-data.discount+Number(data.deliveryCharge)} ₩</p>
            </div>
            <br />
            <hr />
            <hr />
            <div className="bill-last-text">
                <center>
                    <p>Thank you for the shopping.</p>
                    <p>Glad To See You Again !</p>
                    . . .
                </center>
            </div>
        </div>

    </div>
     </div>
  )
}

export default Bill
