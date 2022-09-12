# Desafío 17: Mejorar la arquitectura de nuestra API

Implementar en la capa de persistencia DAO, DTO, repository y Singleton para productos y mensajes. En este caso por defecto se ha colocado que use en memoria pero para productos puede usar SQLite y para mensajes Firebase (revisar el archivo argsConfig.js).


**Este desafío es la mejora del Desafío 16.**

1. Ejecute el script **DBscript** para crear o resetear:

   - La tabla products y users en SQLite3.

   ```
     npm run DBscript
   ```

2. Defina las configuraciones en el archivo .env acorde al archivo .env.example

- Firebase se usa para los mensajes del chat.
- SQLite para productos y manejo de usuarios.
- MongoDB para manejar las sesiones del usuario.

3. Ejecute el siguiente script para iniciar el proyecto

   ```
     npm run dev
   ```