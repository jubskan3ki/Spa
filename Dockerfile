# Étape 1 : Build de l'application
FROM node:20-alpine AS builder

WORKDIR /app

# Installation de PNPM
RUN corepack enable && pnpm --version

# Copier package.json et pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Installation des dépendances
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copier le reste du projet
COPY . .

# Build de l'application
RUN pnpm build

# Étape 2 : Runtime
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Installation des dépendances de production ET devDependencies nécessaires
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile --ignore-scripts --prod=false

# Copier les fichiers buildés
COPY --from=builder /app/dist ./dist

# Port d'exposition pour Vite
EXPOSE 4173

# Commande pour lancer Vite Preview
CMD ["pnpm", "vite", "preview", "--host", "0.0.0.0"]

