import { useLocation } from "react-router-dom";
import { GameSearchResult } from "../../types/types";
import "./_searchResult.scss";

export default function SearchResultPage() {
  const location = useLocation();
  const results = (location.state?.results || []) as GameSearchResult[];
  const query = location.state?.query || "";
  const baseImgUrl = "https://images.igdb.com/igdb/image/upload/t_cover_big/";

  return (
    <div>
      <h1>{query}</h1>
      {results.length === 0 ? (
        <h2 className="error">No results were found for "{query}"</h2>
      ) : (
        <div className="searched-games-holder">
          {results.map((result) => (
            <img
              key={result.id}
              src={
                result.cover
                  ? `${baseImgUrl}${result.cover.image_id}.jpg`
                  : "default-image.jpg"
              }
              alt={result.name}
              className="game-images"
            />
          ))}
        </div>
      )}
    </div>
  );
}
