export default {
  async fetch(request) {
    try {
      const url = new URL(request.url);

      // Get "url" parameter for terabox link
      const videoUrl = url.searchParams.get("url");

      if (!videoUrl) {
        return new Response(
          JSON.stringify({ error: "Missing ?url= parameter" }),
          {
            headers: { "Content-Type": "application/json" }
          }
        );
      }

      // Build real iTeraPlay API URL
      const target =
        "https://iteraplay.com/api/play.php?url=" +
        encodeURIComponent(videoUrl) +
        "&key=iTeraPlay2025";

      // Fetch from original API
      const response = await fetch(target);
      const data = await response.text();

      // Return with CORS allowed
      return new Response(data, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "*",
          "Content-Type": "application/json"
        }
      });

    } catch (err) {
      return new Response(
        JSON.stringify({ error: "Internal Error", details: err.message }),
        {
          headers: { "Content-Type": "application/json" }
        }
      );
    }
  }
};
