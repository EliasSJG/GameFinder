// import { useEffect } from "react";
// import axios from "axios";

// const App = () => {
//   useEffect(() => {
//     const getAccessToken = async () => {
//       try {
//         // Getting the token to get the api to work
//         const response = await axios.post(
//           "https://id.twitch.tv/oauth2/token",
//           null,
//           {
//             //showing crucial to get the token with special ids for the api
//             params: {
//               client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
//               client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
//               grant_type: "client_credentials",
//             },
//           }
//         );

//         //storing the token
//         const accessToken = response.data.access_token;
//         console.log("Access Token:", accessToken);

//         // Getting the games and data
//         const gameResponse = await axios.post(
//           "/api/games", // Proxy path
//           "fields name,genres,release_dates;", // Query to fetch games data
//           {
//             //need this for the api speciality
//             headers: {
//               "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         //showing games in console log
//         console.log("Games:", gameResponse.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     getAccessToken();
//   }, []);

//   return (
//     <div>
//       <h1>IGDB Games</h1>
//     </div>
//   );
// };

// export default App;
