import "./bestGames.scss";
import { useEffect, useState, useMemo } from "react";
import useIGDBHook from "../../hooks/useIGDBHook";

//type for slide of what it contains
type Slide = {
  id: number;
  title: string;
  description: string;
  cover: string;
  artwork: string;
};

export default function bestGames() {
  //holds the active game
  const [activeSlide, setActiveSlide] = useState<Slide | null>(null);
  //gets the specific ids to get the games that you see
  const specificGameIds = [204350, 25076, 1020, 112875];

  //fetches the games
  const games = useIGDBHook(
    `fields name,cover.url,artworks.url,rating,summary; where id = (${specificGameIds.join(
      ","
    )});`,
    4,
    false
  );

  //the slider object with useMemo to reduce recalculating every render
  const slides = useMemo<Slide[]>(() => {
    // Sorts the games so its the they dont switch around every render
    const sortedGames = [...games].sort(
      (a, b) => specificGameIds.indexOf(a.id) - specificGameIds.indexOf(b.id)
    );

    return sortedGames.map((game, index) => ({
      id: index + 1,
      title: game.name,
      description: game.summary || "No description was found",
      cover: `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`,
      artwork: `https:${game.artworks[0].url.replace("t_thumb", "t_1080p")}`,
    }));
  }, [games]);

  // selects default slider
  useEffect(() => {
    if (slides.length > 0 && !activeSlide) {
      setActiveSlide(slides[0]);
    }
  }, [slides, activeSlide]);

  if (!activeSlide) return <div className="loading">Loading carousel...</div>;

  return (
    <div className="carousel">
      <img
        src={activeSlide.artwork}
        alt={activeSlide.title}
        className="big-image"
      />

      <div className="text-content">
        <h1 className="game-title">{activeSlide.title}</h1>
        <p className="game-description">{activeSlide.description}</p>

        <div className="img-div">
          {slides.map((slide) => (
            <img
              key={slide.id}
              src={slide.cover}
              alt={slide.title}
              onClick={() => setActiveSlide(slide)}
              className={slide.id === activeSlide.id ? "active" : ""}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
