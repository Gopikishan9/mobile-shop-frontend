import React from "react";
import InnerNavigate from "./InnerNavigate";

function Search() {
  return (
    <div className="search">
          {/* <InnerNavigate className="navigate"/> */}
          <input
            type="text"
            placeholder="search..."
            width={400}
          />
          {/* <div className="cart"></div> */}
    </div>
  );
}

export default Search;
