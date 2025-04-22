// import GameList from "./components/gamesList/gamesList";
import Footer from "./components/footer/footer";
import Header from "./components/header/header";
import "./main.scss";
import BestGames from "./pages/bestGames/bestGames";
import GameSeries from "./pages/gameSeries/gameSeries";
import GeneralGames from "./pages/generalGames/generalGames";
import Hero from "./pages/hero/hero";

function App() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <GeneralGames></GeneralGames>
      <BestGames></BestGames>
      <GameSeries></GameSeries>
      {/* <GameList></GameList> */}
      <Footer></Footer>
    </>
  );
}

export default App;
