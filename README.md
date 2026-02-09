# UTM Builder

Application web pour construire des liens UTM à partir d'une base de données Notion.

## Prérequis

- [Node.js](https://nodejs.org/) >= 18
- [Vercel CLI](https://vercel.com/docs/cli) (`npm i -g vercel`)
- Une [intégration Notion](https://www.notion.so/my-integrations) avec accès à votre base de données

## Installation

```bash
npm install
```

## Configuration

Copier le fichier d'environnement et renseigner vos identifiants :

```bash
cp .env.example .env
```

Variables à remplir dans `.env` :

| Variable | Description |
|---|---|
| `VITE_NOTION_DATABASE_ID` | ID de votre base de données Notion |
| `NOTION_API_KEY` | Token de votre intégration Notion (secret, côté serveur uniquement) |

La base Notion doit contenir au minimum une colonne de type **Title** (nom de la ressource) et une colonne de type **URL** (le lien).

## Lancement en développement

```bash
vercel dev
```

Cela démarre Vite et le proxy serverless (`/api/notion-proxy`) sur le même port.

## Build de production

```bash
npm run build
```

Les fichiers sont générés dans le dossier `dist/`.

## Déploiement

```bash
vercel
```

Pensez à configurer les variables d'environnement (`VITE_NOTION_DATABASE_ID` et `NOTION_API_KEY`) dans les settings du projet Vercel.