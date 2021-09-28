//Importa pg y utiliza pool:
const { Pool } = require("pg");

//Objeto con los datos de autenticacion para entrar a base de datos:
const config = {
user: "postgres",
host: "localhost",
password: "postgres",
database: "estudiante",
port: 5432,
max: 20,
idleTimeoutMillis: 5000,
connectionTimeoutMillis: 2000,
};

//Nuevo pool y nueva conexion:
const pool = new Pool(config);
pool.connect(async (error_conexion, client, release) => {
if (error_conexion) return console.error(error_conexion.code);

//nueva consulta en JSON:
const SQLQuery = {
    name: "consulta-estudiante",
    rowMode: "array",

    //Elimina estudiante:
    text:"DELETE FROM estudiantes WHERE id= 4 RETURNING *;"

    //Actualiza info de estudiante:
    /* text:"UPDATE estudiantes SET nombre ='Mario' WHERE id= 1 RETURNING *;" */

    // consulta estudiante por rut:
    /* text: "SELECT * FROM estudiantes WHERE rut='11.111.111-1'" */

    // consulta todos los estudiantes:
    /* text: "SELECT * FROM estudiantes" */

    // Agrega un nuevo estudiante:
   /*  text:"insert into estudiantes (id, nombre, rut, curso, nivel) values ($1, $2, $3, $4, $5) RETURNING *;",
    values: [4, "Fernanda", "4444444444-4", "ingles", 4], */
    };

    //try/catch
try {
    const res = await client.query(SQLQuery);
    console.log(res.rows);
    // Paso 2
    } catch (error_consulta) {
    // Paso 3
    console.log(error_consulta.code);
    }
    //libera al cliente:
    release();
    //termina conexion:
    pool.end();
})