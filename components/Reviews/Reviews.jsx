import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import './Reviews.css'
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../src/assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useToast } from '../../context/ToastContext';
import { useNavigate } from "react-router-dom";

/*
  Improved ReviewBox
  - Keeps review list cached in localStorage per itemId so it persists across route changes/overlays
  - Loads fresh data on mount and when itemId changes
  - Updates cached data after add / delete / update
  - Fixes bugs (rate counting, equality checks, render-time side-effects)
  - Does NOT change JSX structure — only logic
*/

export default function ReviewBox({ itemId }) {
  const { historyItemsId, loadOrderHistory, userData, url } = useContext(StoreContext);
  const { showToast } = useToast();
  const navigate = useNavigate();

  // UI & data states
  const [itemReview, setItemReview] = useState([]);       // all reviews for this product
  const [ownReview, setOwnReview] = useState(null);       // this user's own review (if any)
  const [allOwnReview, setAllOwnReview] = useState([]);   // if backend returns list of user's reviews
  const [isOwnReview, setIsOwnReview] = useState(false);
  const [ownReviewId, setOwnReviewId] = useState(null);

  // review input states
  const [name, setName] = useState("");
  const [maskedName, setMaskedName] = useState("**");
  const [imgPreview, setImgPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fileRef = useRef(null);
  const MAX = 300;

  // emoji helper
  const emojiMap = {
    1: "😡",
    2: "😕",
    3: "😐",
    4: "🙂",
    5: "😍",
  };
  const getEmoji = (r) => emojiMap[r] || "✩";

  // ========================================
  // Utility: mask name (show first 2 chars, rest as '*')
  // ========================================
  function maskName(v) {
    if (!v) return "**";
    const parts = v.split(" ");
    const first = parts[0] || "";
    const two = first.slice(0, 2);
    const restLen = Math.max(first.length - 2, 0);
    const maskedFirst = two + "*".repeat(restLen);
    if (parts.length === 1) return maskedFirst;
    const last = parts.slice(1).join(" ");
    return maskedFirst + " " + last[0] + ".";
  }

  // ========================================
  // localStorage caching helpers
  // ========================================
  const cacheKey = (id) => `reviews_cache_${id}`;

  const saveCache = (id, reviews) => {
    try {
      localStorage.setItem(cacheKey(id), JSON.stringify(reviews || []));
    } catch (e) {
      // ignore storage errors
      console.warn("Could not save reviews cache:", e);
    }
  };

  const loadCache = (id) => {
    try {
      const raw = localStorage.getItem(cacheKey(id));
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  };

  // ========================================
  // Load order history once if missing (do not call during render)
  // ========================================
  useEffect(() => {
    if (!historyItemsId && typeof loadOrderHistory === "function") {
      const token = localStorage.getItem("token");
      if (token) loadOrderHistory(token).catch(err => console.error(err));
    }
  }, [historyItemsId, loadOrderHistory]);

  // ========================================
  // Determine if user is allowed to review (based on historyItemsId)
  // ========================================
  const isOKForReview = Array.isArray(historyItemsId) && historyItemsId.includes(itemId);

  // ========================================
  // Load & refresh functions
  // ========================================
  const loadReviewData = useCallback(async (token, id) => {
    if (!id) return;
    if (!token) token = localStorage.getItem("token");

    // Always first try to get a cached copy immediately (so UI shows something)
    const cached = loadCache(id);
    if (cached) setItemReview(cached);

    if (!token) {
      // even without token we can try to fetch (if your API allows), otherwise skip
      try {
        const respNoToken = await axios.post(`${url}/api/review/get`, { itemId: id });
        if (respNoToken.data?.success) {
          const reviews = respNoToken.data.reviews || [];
          setItemReview(reviews);
          saveCache(id, reviews);
          setOwnReview(respNoToken.data.ownReview || null);
          setAllOwnReview(respNoToken.data.allOwnReview || []);
        }
      } catch (err) {
        // ignore network errors when no token
      }
      return;
    }

    // With token -> expect more data (ownReview etc.)
    try {
      const resp = await axios.post(`${url}/api/review/get`, { itemId: id }, { headers: { token } });
      if (resp.data?.success) {
        const reviews = resp.data.reviews || [];
        setItemReview(reviews);
        saveCache(id, reviews);

        const own = resp.data.ownReview || null;
        setOwnReview(own);
        setAllOwnReview(resp.data.allOwnReview || []);
        setIsOwnReview(!!(own && String(own.userId) === String(userData?._id)));
        setOwnReviewId(own?._id || null);

        // set input defaults from own review if exists
        if (own) {
          setText(own.message || "");
          setRating(own.rating || 0);
          setImgPreview(own.image && own.image !== "null" ? own.image : null);
        }
      } else {
        // If API returns success=false, keep cached data but maybe show message
        console.warn("Failed to load reviews:", resp.data?.message);
      }
    } catch (error) {
      console.error("loadReviewData error:", error);
    }
  }, [url, userData]);

  // Load on mount / when itemId changes
  useEffect(() => {
    if (!itemId) return;
    const token = localStorage.getItem("token") || undefined;
    loadReviewData(token, itemId);
  }, [itemId, loadReviewData]);

  // ensure name / maskedName set from local user info (persisted)
  useEffect(() => {
    let saved = localStorage.getItem("userInfo");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setName(parsed.name || "");
        setMaskedName(maskName(parsed.name || ""));
      } catch (e) {
        setName("");
        setMaskedName("**");
      }
    } else {
      setName("");
      setMaskedName("**");
    }
  }, []);

  // ========================================
  // Derived: rating counts
  // ========================================
  const rateCount = itemReview.reduce((acc, r) => {
    const k = Number(r.rating) || 0;
    if (k >= 1 && k <= 5) acc[k] = (acc[k] || 0) + 1;
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  // ========================================
  // File input
  // ========================================
  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImgFile(f);
    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(f);
  };

  // ========================================
  // Post / Update review
  // - If backend returns the created/updated review, we update cache/state optimistically.
  // - Otherwise we reload from server (safe fallback).
  // ========================================
  const onPostReview = async (payload) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to post a review.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("name", payload.name || name);
      formData.append("message", payload.text);
      formData.append("rating", payload.rating);
      if (payload.image) formData.append("image", payload.image);
      formData.append("itemId", itemId);

      const response = await axios.post(`${url}/api/review/add`, formData, {
        headers: {
          token,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data?.success) {
        toast.success(response.data.message || "Review posted.");
        // Either reload fully (safe) OR update locally when backend returns the actual review object
        // Try to use returned review if present:
        const returnedReview = response.data.review || response.data.data || null;
        if (returnedReview) {
          // replace or insert
          setItemReview((prev) => {
            const filtered = prev.filter(r => String(r._id) !== String(returnedReview._id) && String(r.userId) !== String(returnedReview.userId));
            const next = [returnedReview, ...filtered];
            saveCache(itemId, next);
            return next;
          });
          setOwnReview(returnedReview);
          setIsOwnReview(true);
          setOwnReviewId(returnedReview._id);
        } else {
          // fallback: reload from server
          await loadReviewData(token, itemId);
        }

        // reset inputs
        setText("");
        setRating(0);
        setHoverRating(0);
        setImgFile(null);
        setImgPreview(null);
      } else {
        toast.error(response.data?.message || "Failed to add review.");
      }
    } catch (err) {
      console.error("Error posting review:", err);
      toast.error("Failed to post review. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // wrapper called by UI
  const handlePost = (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please give a star rating before posting.");
      return;
    }
    if (!text || !text.trim()) {
      toast.error("Please write a quick review (at least 1 character).");
      return;
    }
    onPostReview({ name: name, rating, text, image: imgFile });
  };

  // ========================================
  // Delete own review
  // ========================================
  const handleDelete = async () => {
    if (!userData?._id) {
      toast.error("You must be logged in to delete a review.");
      return;
    }
    if (!ownReviewId) {
      toast.error("No review selected to delete.");
      return;
    }
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(`${url}/api/review/delete`, { reviewId: ownReviewId }, {
        headers: { token }
      });
      if (res.data?.success) {
        toast.success("Review deleted successfully.");
        // remove from state/cache
        setItemReview(prev => {
          const next = prev.filter(r => String(r._id) !== String(ownReviewId));
          saveCache(itemId, next);
          return next;
        });
        setOwnReview(null);
        setOwnReviewId(null);
        setIsOwnReview(false);
        setText("");
        setRating(0);
        setHoverRating(0);
        // optional navigation (you had that)
        navigate("/Details");
      } else {
        toast.error(res.data?.message || "Failed to delete review.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete review. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // JSX: kept identical to your original structure (only variable names referenced)
  // ========================================
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

              <img className="review-profile-img" src={`https://ui-avatars.com/api/?name=${encodeURIComponent((review.name || "").slice(0, 2) + "*".repeat(Math.max((review.name || "").length - 2, 0)))}&background=7C3AED&color=fff&size=128`} alt="avatar" />

              <div>
                <div className="review-user-name">
                  {(review.name || "").slice(0, 2) + "*".repeat(Math.max((review.name || "").length - 2, 0))}
                </div>
                <div className="review-date">{review.date}</div>
                <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`star ${review.rating >= star ? "filled" : ""}`}
                    >
                      ★
                    </span>
                  ))}

                  <span className="emoji">{getEmoji(review.rating)}</span>
                </div>
              </div>
            </div>

            <div className="review-text">{review.message}</div>

            <div className="review-footer">
              {
                review.image && review.image !== "null" && (
                  <img className="review-image-user"
                    src={review.image}
                    alt="review-image"
                  />
                )
              }
              <div className="char-count">
                {(review.message || "").length} / 200
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
              />
              {imgPreview ? (
                <img className="rb-image" src={isOwnReview && ownReview ? ownReview.image : imgPreview} alt="no-image" />
              ) : (
                <p className="rb-no-img-tag">no image attached</p>
              )}

              <div className="rb-foot">
                <div className="rb-char">{MAX - text.length} chars left</div>
              </div>

              <div className="rb-post">
                {isOwnReview && (
                  <button onClick={handleDelete} disabled={loading}> Delete review</button>
                )}
                <button onClick={handlePost} disabled={loading}>{isOwnReview ? "Update review" : "Post your review"}</button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
