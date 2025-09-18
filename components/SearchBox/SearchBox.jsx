import React, { useContext, useState } from "react";
import "./SearchBox.css";
import { assets } from "../../src/assets/assets";
import { StoreContext } from "../../context/StoreContext"; // adjust path if needed
import FoodItem from "../FoodItem/FoodItem"; // adjust path if needed

const SearchBox = ({ setSearchBox }) => {
  const { food_list } = useContext(StoreContext);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState("");


  // filter suggestions (max 5)
  const suggestions = query
    ? food_list
      .filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5)
    : [];

  const topMatchedCategory = suggestions.length > 0 ? suggestions[0].category : null;

  // Items of that category
  const matchedCategoryItems = topMatchedCategory
    ? food_list.filter((item) => item.category === topMatchedCategory)
    : [];
  // filtered list to display
  const filteredItems = selectedQuery
    ? food_list.filter((item) =>
      item.name.toLowerCase().includes(selectedQuery.toLowerCase().trim())
    )
    : [];


  const handleSelectSuggestion = (name) => {
    setQuery(name);          // update input value
    setSelectedQuery(name);  // trigger search result listing
    setShowSuggestions(false); // close suggestions after click
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSelectedQuery(query);
    setShowSuggestions(false);
  };


  return (
    <div className="search-container">
      <div className="search-box-1">

        <form onSubmit={handleSubmit}>
          <div className="search">
            <input
              type="text"
              placeholder="Search here..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
            />
            <button type="submit" className="button">
              <img src={assets.search} alt="search" />
            </button>
          </div>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions">
            {suggestions.map((item, idx) => (
              <li key={idx} onClick={() => handleSelectSuggestion(item.name)}>
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <br />


      {/* Display results */}
      {selectedQuery && (
        <div className="search-results">
          <h2 className="results-title">
            Showing results for: <span>{selectedQuery}</span>
          </h2>
          <br />
          <div className="food-display-list">
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  image2={item.image2}
                  image3={item.image3}
                  category={item.category}
                  discount={item.discount}
                />
              ))
            ) : (
              <p className="no-results">No items found.</p>
            )}
          </div>
        </div>
      )}

      <br />

      {topMatchedCategory && (
        <div className="matched-category">
          <h2 className="category-title">
            Top Matched Category: <span>{topMatchedCategory}</span>
          </h2>
          <br />
          <div className="category-items">
            {matchedCategoryItems.map((item, idx) => (
              <FoodItem
                key={idx}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                image2={item.image2}
                image3={item.image3}
                category={item.category}
                discount={item.discount}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default SearchBox;
