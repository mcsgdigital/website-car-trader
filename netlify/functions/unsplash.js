const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const handler = async (event) => {
  const query = event.queryStringParameters?.q || "cars";

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&per_page=12`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error fetching Unsplash data:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from Unsplash" }),
    };
  }
};

module.exports = { handler };