import { Outlet } from "react-router-dom";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import StarBackground from "../components/background/starBackground";

export default function RootLayout() {
  return (
    <>
      <StarBackground />
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
