# Estágio 1: Build
FROM node:20-alpine AS build
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
RUN npm ci

# Copiar o resto do código
COPY . .

# Build da aplicação (Vite)
RUN npm run build

# Estágio 2: Servir com Nginx
FROM nginx:stable-alpine

# Copiar o build do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar a configuração customizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
