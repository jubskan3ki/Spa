# Étape 1 : Installation des dépendances et build
FROM node:22 AS build
WORKDIR /app

# Copie des fichiers nécessaires
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copie du code source
COPY . .

# Build de l'application
RUN pnpm run build

# Étape 2 : Exécution en local avec un serveur simple
FROM node:22
WORKDIR /app

# Copie des fichiers du build
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY package.json .

EXPOSE 3000

# Commande de lancement
CMD ["npx", "vite", "preview", "--host"]
