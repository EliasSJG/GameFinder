import { useState } from "react";
import { useNavigate } from "react-router-dom";
import fetchGames from "../../hooks/fetchGames";
import "./_search.scss";

export default function Search() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  //validation if user didnt search on anything
  const handleSearch = async () => {
    if (search === "") {
      alert("You didnt search on anything");
      return;
    }
    //gets the results of the search and put it in the fetch to search on the game
    const results = await fetchGames(search);
    console.log(results);
    //navigates to the searchResults page
    navigate("/search", { state: { results, query: search } });
  };

  //To be able to click on enter and search
  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Search for game or character..."
        className="search-input"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleEnterKey}
      />

      <img
        className="search-icon"
        src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
        alt="Search icon"
        onClick={handleSearch}
      />
    </div>
  );
}
