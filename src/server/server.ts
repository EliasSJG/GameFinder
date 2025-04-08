// import express from "express";
// import axios from "axios";
// import cors from "cors";

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());

// const CLIENT_ID = "your-client-id";
// const ACCESS_TOKEN = "your-access-token";

// app.get("/api/games", async (_req, res) => {
//   try {
//     const response = await axios.post(
//       "https://api.igdb.com/v4/games",
//       "fields name,genres.name; limit 10;", // you can change fields as you want
//       {
//         headers: {
//           "Client-ID": CLIENT_ID,
//           Authorization: `Bearer ${ACCESS_TOKEN}`,
//         },
//       }
//     );
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching games:", error);
//     res.status(500).json({ error: "Failed to fetch games" });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
