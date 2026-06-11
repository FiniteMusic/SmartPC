/* Para apagar contenedores sin borrar la base */

docker compose up -d --build

/* Para apagar contenedores sin borrar la base */

docker compose down

/* Para apagar y borrar la base dockerizada */

docker compose down -v

/* Para ver logs */

docker compose logs -f

/* Para confirmar que todo está corriendo. */

docker ps

/* Si se modifica databases/smartpc_db.sql, hay que ejecutar: */

docker compose down -v
docker compose up -d --build