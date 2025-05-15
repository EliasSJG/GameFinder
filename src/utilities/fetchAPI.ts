type TokenResponse = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

//fetches the token
const getAccessToken = async (): Promise<string> => {
  const tokenRes = await fetch("https://id.twitch.tv/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: import.meta.env.VITE_TWITCH_CLIENT_ID,
      client_secret: import.meta.env.VITE_TWITCH_CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  });
  const { access_token } = (await tokenRes.json()) as TokenResponse;
  return access_token;
};

const fetchFromIGDB = async <T>(endpoint: string, body: string): Promise<T> => {
  //sets the standard fetch used in every fetch to increase dry
  try {
    const token = await getAccessToken();

    const headers = {
      "Client-ID": import.meta.env.VITE_TWITCH_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    };

    const res = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });

    const data = (await res.json()) as T;
    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch data from IGDB");
  }
};

export { fetchFromIGDB };
