import React, { useEffect, useState } from "react";
import FormInput from "../form-input/form-input";

import "./search-bar.scss";

const SearchBar = ({ queryValue }) => {
  const [query, setQuery] = useState("");
  const handleChange = (event) => {
    const { value, name } = event.target;

    if (name === "query") {
      queryValue(value);
    }
  };

  useEffect(() => {
    queryValue(query);
  }, [query]);

  return (
    <div className="search-bar">
      <FormInput
        placeholder={"Search your expenses"}
        search="true"
        type="text"
        name="query"
        value={query}
        handleChange={handleChange}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
    </div>
  );
};

export default SearchBar;
