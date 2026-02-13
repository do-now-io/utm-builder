"""List all Notion databases accessible with the API key from .env"""

import os
import json
import urllib.request

# Read .env manually (no dependency needed)
env = {}
with open(os.path.join(os.path.dirname(__file__), ".env")) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            key, value = line.split("=", 1)
            env[key.strip()] = value.strip()

api_key = env.get("NOTION_API_KEY", "")
if not api_key:
    print("NOTION_API_KEY not found in .env")
    exit(1)

headers = {
    "Authorization": f"Bearer {api_key}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
}

# Search for all databases
req = urllib.request.Request(
    "https://api.notion.com/v1/search",
    data=json.dumps({"filter": {"value": "database", "property": "object"}}).encode(),
    headers=headers,
    method="POST",
)

with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read())

databases = data.get("results", [])

if not databases:
    print("No databases found (check API key permissions).")
    exit(0)

print(f"Found {len(databases)} database(s):\n")
for db in databases:
    db_id = db["id"]
    title_parts = db.get("title", [])
    title = "".join(t.get("plain_text", "") for t in title_parts) or "(untitled)"
    props = list(db.get("properties", {}).keys())

    print(f"  {title}")
    print(f"  ID: {db_id}")
    print(f"  Properties: {', '.join(props)}")
    print()
