import express from 'express';
import mongoose from 'mongoose';
import nunjucks from 'nunjucks';
import methodOverride from 'method-override';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import matchesRouter from './routes/matches.js';
import refereeRouter from './routes/referee.js';
// TODO Importar el enrutador de árbitros

dotenv.config();

// Rutas absolutas construidas desde import.meta.url
const bootstrapPath = fileURLToPath(
  new URL('./node_modules/bootstrap/dist', import.meta.url)
);

const publicPath = fileURLToPath(
  new URL('./public', import.meta.url)
);

const viewsPath = fileURLToPath(
  new URL('./views', import.meta.url)
);
const app = express();

// Configuración de Nunjucks
nunjucks.configure(viewsPath, {
  autoescape: true,
  express: app
});

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      let method = req.body._method;
      delete req.body._method;
      return method;
    } 
}));

// Archivos estáticos
app.use('/bootstrap', express.static(bootstrapPath));
app.use(express.static(publicPath));

// Variables de entorno
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a Mongo
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error MongoDB:', err));

// Rutas

app.get('/', (req, res) => { res.redirect('/matches'); });
app.use('/matches', matchesRouter);
app.use('/referees', refereeRouter);
// TODO EXAMEN Completar las rutas que falten

// Arranque
app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT} http://localhost:8080`);
});



