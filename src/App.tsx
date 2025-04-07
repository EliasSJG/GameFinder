import Header from "./components/header/header";
import "./main.scss";
import GeneralGames from "./pages/generalGames/generalGames";
import Hero from "./pages/hero/hero";

function App() {
  return (
    <>
      <Header></Header>
      <Hero></Hero>
      <GeneralGames></GeneralGames>
    </>
  );
}

export default App;
