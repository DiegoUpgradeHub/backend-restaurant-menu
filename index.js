//Requerir paquetes o librerias
const express = require(`express`);
const router = express.Router();
const { connect } = require(`./utils/db`);
require('dotenv').config();

//Requerir las rutas y crear variables con ellas
const productsRouter = require(`./routes/product.routes`);

connect();

const PORT = process.env.PORT || 3000;
const server = express();

//Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: false }));


//Ruta al HTML. Útil para desplegar en Vercel
server.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

//Ruta para añadir estilos con CSS
server.use(express.static(__dirname + '/public'))

//Routes
server.use(`/products`, productsRouter);

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

//Listener del servidor
server.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});