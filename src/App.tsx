import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.scss";

import RootLayout from "./layout/RootLayout";
import FirstPage from "./pages/fullFirstPage/FirstPage";
import SearchResultPage from "./pages/SearchResult/searchResult";
import DetailPage from "./pages/detailPage/detailPage";
import StatisticPage from "./pages/statisticPage/statisticPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <FirstPage /> },
        { path: "search", element: <SearchResultPage /> },
        { path: "statistics", element: <StatisticPage /> },
        { path: "game/:gameId", element: <DetailPage /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
