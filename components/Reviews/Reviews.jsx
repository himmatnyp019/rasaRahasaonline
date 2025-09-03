
import React, { useState, useRef, useContext, useEffect } from "react";
import './Reviews.css'
import { StoreContext } from "../../context/StoreContext";
import { assets, userInfo } from "../../src/assets/assets";
import axios from 'axios'
import { useToast } from '../../context/ToastContext';

export default function ReviewBox({ itemId }) {
  const { historyItemsId, userData, itemReview, ownReview, url, passProductID } = useContext(StoreContext);
  let userName = "";
  let userInfo = {};

  if (Object.keys(userData).length === 0) {
    let savedData = localStorage.getItem("userInfo");
    if (savedData) {
      userInfo = JSON.parse(savedData);  // parse because it's stored as string
      userName = userInfo.name
    }
  }
  const [name, setName] = useState(userName);
  const [isOwnReview, setIsOwnReview] = useState(false);
  const [maskedName, setMaskedName] = useState(maskName(name));
  const [imgPreview, setImgPreview] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);
   const { showToast } = useToast()


  useEffect(() => {
 if (ownReview !== undefined && ownReview !== null && Object.keys(ownReview).length !== 0 ) {
    
   if (ownReview.userId === userData._id) { // ✅ strict equality
          setIsOwnReview(true)
          setText(ownReview.message)
          setRating(ownReview.rating)
          setImgPreview(ownReview.image)
        }
  }

  }, [ownReview,userData]);
  console.log(isOwnReview);
  


  const fileRef = useRef(null);
  let productId = itemId;
  let isOKForReview = false

  historyItemsId.map((items, index) => {
    if (items === itemId) {
      isOKForReview = true;
    }
  })


  const handleDelete = async () => {
    if (!userData?._id) {
      alert("You must be logged in to delete a review.");
      return;
    }

    try {
      setLoading(true);
      if (localStorage.getItem("token")) {
        console.log(localStorage.getItem("token"));
        
        const res = await axios.post("http://localhost:5000/api/review/delete", {
          userId: userData._id,
          reviewId: ownReview._id,
        },
          {
            headers: {
              token: localStorage.getItem("token"), // ✅ token here
            },
          });
  
        if (res.data.success) {
          alert("Review deleted successfully.");
          // Call parent refresh / remove from state
          showToast("Review deleted sucessfully.")
        } else {
          alert(res.data.message || "Failed to delete review.");
        }

      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong while deleting.");
    } finally {
      setLoading(false);
    }
  };


  const MAX = 300;
  const rateCount = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  }

  const emojiMap = {
    1: "😡",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😍",
  };
  const getEmoji = (rating, rateCount) => {

    switch (rating) {
      case 1:
        return "😡";
      case 2:
        return "😕";
      case 3:
        return "😐";
      case 4:
        return "😊";
      case 5:
        return "😍";
      default:
        return "🙂";
    }

  };
  useEffect(() => {
    passProductID(productId)
  }, [productId]);

  getEmoji(rating, rateCount)
  itemReview.map((item, index) => {
    if (index = item.rating) {
      rateCount[index] += 1;
    }
  });

  function maskName(v) {

    if (!v) return "**";
    const parts = v.split(" ");
    const first = parts[0] || "";
    const two = first.slice(0, 2);
    const restLen = Math.max(first.length - 2, 0);
    const maskedFirst = two + "*".repeat(restLen);

    if (parts.length === 1) return maskedFirst;
    // keep last name initial only
    const last = parts.slice(1).join(" ");
    return maskedFirst + " " + last[0] + ".";
  }

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setImgFile(f); // ✅ store real file

    // just for preview
    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handlePost = (event) => {
    const payload = { name, rating, text, image: imgFile };
    // Simple validation
    event.preventDefault();
    if (!rating) {
      alert("Please give a star rating before posting.");
      return;
    }
    if (text.trim().length === 0) {
      alert("Please write a quick review (at least 1 character)");
      return;
    }
    // pass to callback or just console log
    onPostReview(payload);

  };
  const onPostReview = async (payload) => {
    try {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("message", payload.text);
      formData.append("rating", payload.rating);
      formData.append("image", payload.image);
      formData.append("itemId", itemId);

      // Get token from localStorage
      const token = localStorage.getItem("token"); // or from userInfo

      const response = await axios.post(
        `${url}/api/review/add`,
        formData,
        {
          headers: {
            token: token,                          //  must match backend
            "Content-Type": "multipart/form-data", // for FormData
          },
        }
      );

      if (response.data.success) {
        console.log("Review posted", payload);
        setText("");
        setRating(0);
        setHoverRating(0);
        alert("Thanks! Your review was posted.");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };


  return (
    <div className="rb-root">
      <div className='reviews-container'>
        <div className="reviews-title">
          <h2>Customer Reviews</h2>
          <br />
        </div>
        <div data-aos="fade-right" className="reviews-star">
          <h1 className="total-rating">4.5</h1>
          <img src={assets.rating_starts} alt="" />
          <p>reviews by authentic purchase</p>
        </div>
        <div className="rating-count">
        </div>

      </div>

      {/* ------review by other----------- */}
      <div className="review-list-container">
        {itemReview.map((review, index) => (
          <div key={review._id} data-aos="fade-up" data-aos-delay={150 * index} className="review-card">
            <div className="review-header">

              <img className="review-profile-img" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(review.name.slice(0, 2) + "*".repeat(review.name.length - 2))}&background=7C3AED&color=fff&size=128`} alt="avatar" />

              <div>
                <div className="review-user-name">
                  {review.name.slice(0, 2) + "*".repeat(review.name.length - 2)}
                </div>
                <div className="review-date">{review.date}</div>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${review.rating >= star ? "filled" : ""
                        }`}
                    >
                      ★
                    </span>
                  ))}

                  <span className="emoji">{getEmoji(review.rating, rateCount)}</span>
                </div>
              </div>
            </div>

            <div className="review-text">{review.message}</div>

            <div className="review-footer">
              {
                review.image !== "null" && (
                  <img className="review-image-user"
                    src={`${url}/reviewsImages/${review.image}`}
                    alt="review-image"
                  />


                )
              }
              <div className="char-count">
                {review.message.length} / 200
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* write own review section  */}
      {
        isOKForReview && (
          <div data-aos="fade-left" className="rb-card">
            <div className="rb-top">
              <div className="rb-avatar">

                <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(maskedName)}&background=7C3AED&color=fff&size=128`} alt="avatar" />

              </div>

              <div className="rb-name-area">
                <div className="rb-top-contents" style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between' }}>
                  <div>
                    <div className="rb-username">{maskedName}</div>
                    <small style={{ color: '#9CA3AF' }}>Share your experience — it helps others</small>
                  </div>

                  <div className="rb-actions">
                    <label className="rb-upload-btn" title="Upload profile image">
                      <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
                      Add Image
                    </label>
                    <button className="rb-upload-btn" onClick={() => { setImgPreview(null); fileRef.current && (fileRef.current.value = null); }}>Clear</button>
                  </div>
                </div>

                {/* Stars and emoji */}
                <div className="rb-stars">
                  <div className="stars" role="radiogroup" aria-label="Rating">
                    {[1, 2, 3, 4, 5].map((s) => {
                      const filled = (hoverRating || rating) >= s;
                      return (
                        <div
                          key={s}
                          className={`star ${filled ? 'filled' : 'empty'}`}
                          onMouseEnter={() => setHoverRating(s)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(s)}
                          role="radio"
                          aria-checked={rating === s}
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter') setRating(s) }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>
                      )
                    })}
                  </div>

                  <div className="rb-emoji" aria-hidden>
                    <span style={{ opacity: (hoverRating || rating) ? 1 : 0, transform: (hoverRating || rating) ? 'translateY(0) scale(1)' : 'translateY(6px) scale(.92)', transition: 'all .18s' }}>
                      {emojiMap[hoverRating || rating] || '✩'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Review text area */}
            <div className="rb-textarea">
              <textarea
                maxLength={MAX}
                placeholder="Write your review here... (300 characters max)"
                value={text}
                onChange={(e) => setText(e.target.value)}

              >


              </textarea>
              {imgPreview ? (
                <img className="rb-image" src={isOwnReview ? `${url}/reviewsImages/${ownReview.image}` : imgPreview} alt="no-image" />
              ) : (
                <p className="rb-no-img-tag">no image attached</p>
              )}

              <div className="rb-foot">

                <div className="rb-char">{MAX - text.length} chars left</div>
              </div>

              <div className="rb-post">
                {isOwnReview && (
                  <button onClick={handleDelete}> Delete review</button>
                )}
                <button onClick={handlePost}>{isOwnReview ? "Update review" : "Post your review"}</button>
              </div>
            </div>
          </div>
        )
      }



    </div>


  );
}

