# Usa una imagen base de Node.js
FROM node

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye el proyecto para producción
RUN npm run build

# Instala una herramienta para servir los archivos estáticos
RUN npm install -g serve

# Expone el puerto 3000
EXPOSE 3000

# Comando para servir la aplicación
CMD ["serve", "-s", "dist", "-l", "3000"]