import "./bestGames.scss";
import { useEffect, useState } from "react";
import useIGDBHook from "../../hooks/IGDBCustomHook";

type Slide = {
  id: number;
  title: string;
  description: string;
  cover: string;
  artwork: string;
  summary?: string;
};

export default function Carousel() {
  const [activeSlide, setActiveSlide] = useState<Slide | null>(null);
  const specificGameIds = [204350, 25076, 1020, 112875];

  const games = useIGDBHook(
    `fields name,cover.url,artworks.url,rating,summary; where id = (${specificGameIds.join(
      ","
    )});`,
    4,
    false
  );

  const slides: Slide[] = games.map((game, index) => ({
    id: index + 1,
    title: game.name,
    description: game.summary || "No description was found",
    cover: game.cover?.url
      ? `https:${game.cover.url.replace("t_thumb", "t_cover_big")}`
      : "",
    artwork: game.artworks?.[0]?.url
      ? `https:${game.artworks[0].url.replace("t_thumb", "t_1080p")}`
      : "",
  }));

  useEffect(() => {
    if (slides.length > 0 && !activeSlide) {
      setActiveSlide(slides[0]);
    }
  }, [slides]);

  if (!activeSlide) return <div>Loading carousel...</div>;

  return (
    <div className="carousel">
      <img
        src={activeSlide.artwork}
        alt={activeSlide.title}
        className="big-image"
      />
      <div className="text-content">
        <h1>{activeSlide.title}</h1>
        <p>{activeSlide.description}</p>

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
