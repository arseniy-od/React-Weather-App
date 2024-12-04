import React, { useState } from "react";
import axios from "axios";

function SearchEngine({ setQuery }) {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const fetchSuggestions = async (input) => {
    try {
      const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;
      const response = await axios.get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&type=city&format=json&limit=20&apiKey=${apiKey}`
      );
      const filteredSuggestions = response.data.results.filter(
        (res) => res.category === "populated_place"
      );
      setSuggestions(filteredSuggestions);
      console.log("suggestions,", suggestions);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setError("Failed to fetch suggestions. Please try again.");
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setValue(input);

    if (input.length > 2) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setValue(city);
    setQuery(city);
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value);
    setSuggestions([]);
  };

  return (
    <div>
      <form className="SearchEngine" onSubmit={handleSubmit}>
        <input
          type="text"
          className="city-search"
          placeholder="Enter city name"
          value={value}
          onChange={handleInputChange}
        />
        <button type="submit">
          <i className="fas fa-search" style={{ fontSize: "18px" }}></i>
        </button>
        {error && <div className="error-message">{error}</div>}

        {suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion.city)}>
                {suggestion.address_line1}, {suggestion.address_line2}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
}

export default SearchEngine;
