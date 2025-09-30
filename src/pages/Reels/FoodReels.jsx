// FoodReels.jsx
import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import './FoodReels.css';
import { StoreContext } from '../../../context/StoreContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMinus,
  faPlus

} from "@fortawesome/free-solid-svg-icons";

const HeartIcon = ({ filled = false }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const ShareIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51l6.83 3.98" />
    <path d="M15.41 6.51l-6.82 3.98" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7,10 12,15 17,10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);



const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const MinusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="18,15 12,9 6,15" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <polyline points="6,9 12,15 18,9" />
  </svg>
);


// Mock provider - remove this when using your actual context
const MockStoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [productMsg, setProductMsg] = useState({});
  const [showChat, setShowChat] = useState(false);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems(prev => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems(prev => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems(prev => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }));
  };

  // const productMsgHandler = async (id, name, image, price, discount) => {
  //   setProductMsg({ productId: id, name, image, price, discount });
  //   setShowChat(true);
  // };

  return (
    <StoreContext.Provider value={{
      food_list: mockFoodList,
      cartItems,
      addToCart,
      removeFromCart,
      url: 'http://localhost:3000',
      setProductMsg,
      setShowChat,
      productMsgHandler
    }}>
      {children}
    </StoreContext.Provider>
  );
};

const FoodReels = () => {
  const { food_list, cartItems, addToCart, removeFromCart } = useContext(StoreContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedItems, setLikedItems] = useState(new Set());
  const [scale, setScale] = useState(1);
  const [isZooming, setIsZooming] = useState(false);
  const [touchStart, setTouchStart] = useState({ y: null, time: null });
  const [touchEnd, setTouchEnd] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const imageRefs = useRef([]);
  //
  const productMsgHandler = async (id, name, image, price, discount) => {
    setProductMsg({ productId: id, name, image, price, discount });
    setShowChat(true);
  };

  // Prevent body scroll when component mounts
  useEffect(() => {
    document.body.classList.add('reels-active');
    return () => {
      document.body.classList.remove('reels-active');
    };
  }, []);

  // Load liked items from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedFoodItems');
    if (savedLikes) {
      setLikedItems(new Set(JSON.parse(savedLikes)));
    }
  }, []);

  // Save liked items to localStorage
  const saveLikedItems = useCallback((newLikedItems) => {
    localStorage.setItem('likedFoodItems', JSON.stringify(Array.from(newLikedItems)));
  }, []);

  // Handle like button
  const handleLike = useCallback((itemId) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId);
    } else {
      newLikedItems.add(itemId);
    }
    setLikedItems(newLikedItems);
    saveLikedItems(newLikedItems);
  }, [likedItems, saveLikedItems]);

  // Handle share button
  const handleShare = useCallback(async (item) => {
    const shareData = {
      title: item.name,
      text: `Check out this delicious ${item.name}!`,
      url: `${window.location.origin}/food/${item._id}`
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Could not copy to clipboard:', err);
      }
    }
  }, []);

  // Handle download image
  const handleDownload = useCallback(async (item) => {
    setLoading(true);
    try {
      const response = await fetch(item.image);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.name.replace(/\s+/g, '_')}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Navigation functions
  const goToNext = useCallback(() => {
    if (currentIndex < food_list.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex + 1);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [currentIndex, food_list.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex(currentIndex - 1);
      setTimeout(() => setIsTransitioning(false), 400);
    }
  }, [currentIndex, isTransitioning]);

  // Touch handlers
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart({
      y: e.targetTouches[0].clientY,
      time: Date.now()
    });
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (scale > 1) return; // Don't scroll when zoomed
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientY);
  }, [scale]);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart.y || !touchEnd || scale > 1) return;

    const distance = touchStart.y - touchEnd;
    const timeElapsed = Date.now() - touchStart.time;
    const velocity = Math.abs(distance) / timeElapsed;

    // Only navigate if it's a clear swipe (distance > 50px and fast enough)
    if (Math.abs(distance) > 50 && velocity > 0.3) {
      if (distance > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
  }, [touchStart, touchEnd, scale, goToNext, goToPrev]);

  // Wheel handler for zoom
  const handleWheel = useCallback((e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const newScale = Math.min(Math.max(scale + delta, 1), 3);
      setScale(newScale);
      setIsZooming(newScale > 1);
    }
  }, [scale]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrev();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [goToNext, goToPrev]);

  if (!food_list || food_list.length === 0) {
    return (
      <div className="food-reels-container">
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  const currentItem = food_list[currentIndex];
  const discountedPrice = currentItem.discount
    ? currentItem.price - (currentItem.price * currentItem.discount / 100)
    : currentItem.price;

  return (
    <div
      ref={containerRef}
      className="food-reels-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <div
        ref={wrapperRef}
        className="reels-wrapper"
        style={{
          transform: `translateY(-${currentIndex * 100}vh)`
        }}
      >
        {food_list.map((item, index) => (
          <div key={item._id} className="reel-item">
            <img
              ref={(el) => imageRefs.current[index] = el}
              src={item.image}
              alt={item.name}
              className={`reel-background ${scale > 1 ? 'zoomed' : ''}`}
              style={{
                transform: index === currentIndex ? `scale(${scale})` : 'scale(1)'
              }}
              loading={index === currentIndex ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="action-buttons">
        <button
          onClick={() => handleLike(currentItem._id)}
          className={`action-btn ${likedItems.has(currentItem._id) ? 'liked' : ''}`}
        >
          <HeartIcon filled={likedItems.has(currentItem._id)} />
        </button>

        <button
          onClick={() => productMsgHandler(
            currentItem._id,
            currentItem.name,
            currentItem.image,
            currentItem.price,
            currentItem.discount
          )}
          className="action-btn"
        >
          <MessageIcon />
        </button>

        <button
          onClick={() => handleShare(currentItem)}
          className="action-btn"
        >
          <ShareIcon />
        </button>

        <button
          onClick={() => handleDownload(currentItem)}
          className="action-btn"
          disabled={loading}
        >
          <DownloadIcon />
        </button>
      </div>

      {/* Product info */}
      <div className="product-info">
        <h2 className="product-title">{currentItem.name}</h2>

        <div className="product-price-section">
          {currentItem.discount > 0 ? (
            <>
              <span className="current-price">
                {discountedPrice.toFixed(2)}₩
              </span>
              <span className="original-price">
                {currentItem.price.toFixed(2)}₩
              </span>
              <span className="discount-badge">
                -{currentItem.discount}₩
              </span>
            </>
          ) : (
            <span className="current-price">
              ${currentItem.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {!cartItems[currentItem._id] ? (
          <button
            onClick={() => addToCart(currentItem._id)}
            className="add-to-cart-btn"
            disabled={loading}
          >
            <FontAwesomeIcon icon={faCartShopping} />
            Add to Cart
          </button>
        ) : (
          <div className="quantity-controls">
            <button
              onClick={() => removeFromCart(currentItem._id)}
              className="quantity-btn"
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <span className="quantity-display">
              {cartItems[currentItem._id]}
            </span>
            <button
              onClick={() => addToCart(currentItem._id)}
              className="quantity-btn"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </div>

      {/* Desktop navigation */}
      <div className="desktop-nav">
        {currentIndex > 0 && (
          <button
            onClick={goToPrev}
            className="nav-btn nav-prev"
            disabled={isTransitioning}
          >
            <ChevronUpIcon />
          </button>
        )}

        {currentIndex < food_list.length - 1 && (
          <button
            onClick={goToNext}
            className="nav-btn nav-next"
            disabled={isTransitioning}
          >
            <ChevronDownIcon />
          </button>
        )}
      </div>

      {/* Progress indicators */}
      <div className="progress-indicators">
        {food_list.map((_, index) => (
          <div
            key={index}
            className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      {/* Zoom indicator */}
      {scale > 1 && (
        <div className={`zoom-indicator ${scale > 1 ? 'visible' : ''}`}>
          {Math.round(scale * 100)}%
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <div className="div-cover">
      </div>
    </div>
  );
};


export default FoodReels;