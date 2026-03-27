# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
# We use 'serve' to host the static Vite files
RUN npm install -g serve
COPY --from=build /app/dist ./dist

# Vite's default preview port is 4173
EXPOSE 4173
# The -l flag binds it to the port Render expects
CMD ["serve", "-s", "dist", "-l", "4173"]