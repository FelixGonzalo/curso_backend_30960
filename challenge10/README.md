# Desafío 9: Mocks y normalización

## Consigna 1:

- Lista de 5 productos para test en endpoint: **/api/products/test**
- Ruta donde se muestra la vista con los productos de test: **/test/products**

## Consigna 2:

- El chat ahora muestra el porcentaje de reducción al manejar data normalizada.
- Los mensajes tiene el nuevo formato y se guardan en firebase.

## Para ejecutar correctamente el proyecto:

1. Ejecute el script **DBscript** para crear o resetear:

   - La tabla products en SQLite3.

   ```
     npm run DBscript
   ```

2. Defina el api key de firebase en el archivo .env acorde al archivo .env.example

```
FIREBASE_KEY =
  '{"type": "service_account" ...}'

```

3. Ejecute el siguiente script para iniciar el proyecto

   ```
     npm run dev
   ```
