const express = require('express');
const app = express();
const cors = require('cors');

//configuraciones
require('./config/variables');

//base de datos
require('./config/database');

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//rutas
app.use('/api/usuario', require('./routes/usuario.route'));
app.use('/api/login', require('./routes/login.route'));
app.use('/api/proyecto', require('./routes/proyecto.route'));
app.use('/api/tarea', require('./routes/tarea.route'));

app.listen(process.env.PORT, () => {
  console.log('Escuchando el puerto', process.env.PORT )
})