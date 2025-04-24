import BestGames from "../bestGames/bestGames";
import GeneralGames from "../generalGames/generalGames";
import Hero from "../hero/hero";

export default function FirstPage() {
  return (
    <>
      <Hero></Hero>
      <BestGames></BestGames>
      <GeneralGames></GeneralGames>
    </>
  );
}
