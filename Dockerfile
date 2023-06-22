# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:16-alpine 

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de tu aplicación React al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Expón el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Establece el comando de inicio del contenedor
CMD ["npm", "start"]