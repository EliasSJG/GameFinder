import { useEffect } from "react";
import axios from "axios";

const App = () => {
  useEffect(() => {
    const getAccessToken = async () => {
      try {
        // Requesting the Twitch access token
        const response = await axios.post(
          "https://id.twitch.tv/oauth2/token",
          null,
          {
            params: {
              client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
              client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
              grant_type: "client_credentials",
            },
          }
        );

        const accessToken = response.data.access_token;
        console.log("Access Token:", accessToken);

        // Requesting data from IGDB API through the proxy
        const gameResponse = await axios.post(
          "/api/games", // Proxy path
          "fields name,genres,release_dates;", // Query to fetch games data
          {
            headers: {
              "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("Games:", gameResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAccessToken();
  }, []);

  return (
    <div>
      <h1>IGDB Games</h1>
    </div>
  );
};

export default App;
