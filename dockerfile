# Etapa 1: Compilar la aplicación Angular
FROM node:18 AS build

# Definir el directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install -g @angular/cli
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar la aplicación en modo producción
RUN ng build --configuration production

# Etapa 2: Servir con Nginx
FROM nginx:1.25-alpine

# Copiar la build de Angular al contenedor de Nginx
COPY --from=build /app/dist/nasa /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando de inicio
CMD ["nginx", "-g", "daemon off;"]
