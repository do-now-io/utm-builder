import express from "express";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

const app = express();

// --- Notion proxy (same in dev & prod) ---
app.post("/api/notion-proxy", async (_req, res) => {
  const apiKey = process.env.NOTION_API_KEY;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!apiKey || !databaseId) {
    return res
      .status(500)
      .json({ error: "NOTION_API_KEY or NOTION_DATABASE_ID not configured" });
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
      },
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});

// --- Frontend ---
if (isProduction) {
  app.use(express.static(resolve(__dirname, "dist")));
  app.get("*path", (_req, res) => {
    res.sendFile(resolve(__dirname, "dist", "index.html"));
  });
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
}

const port = process.env.PORT ?? 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
