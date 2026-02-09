import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";

function notionProxy(): Plugin {
  let apiKey = "";
  return {
    name: "notion-proxy",
    configResolved({ env }) {
      apiKey = env.NOTION_API_KEY ?? process.env.NOTION_API_KEY ?? "";
    },
    configureServer(server) {
      server.middlewares.use("/api/notion-proxy", async (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }

        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);
        const { databaseId } = JSON.parse(Buffer.concat(chunks).toString());

        if (!databaseId) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "databaseId is required" }));
          return;
        }

        try {
          const response = await fetch(
            `https://api.notion.com/v1/databases/${databaseId}/query`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${apiKey}`,
                "Notion-Version": "2022-06-28",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}),
            }
          );

          const data = await response.text();
          res.writeHead(response.status, { "Content-Type": "application/json" });
          res.end(data);
        } catch (error) {
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: error instanceof Error ? error.message : "Unknown error",
            })
          );
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  // Make NOTION_API_KEY available to the plugin via process.env
  process.env.NOTION_API_KEY = env.NOTION_API_KEY;

  return {
    plugins: [react(), tailwindcss(), notionProxy()],
  };
});
