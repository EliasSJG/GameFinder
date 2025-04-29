import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchGames from "../../hooks/fetchGames";
import "./_search.scss";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (searchInput === "") {
      alert("You didnt search on anything");
      return;
    }
    const results = await fetchGames(searchInput);
    console.log(results);

    navigate("/search", { state: { results, query: searchInput } });
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Search for game or charachter..."
        className="search-input"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearch();
        }}
      />

      <img
        className="search-icon"
        src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
        alt=""
        onClick={handleSearch}
      />
    </div>
  );
}
