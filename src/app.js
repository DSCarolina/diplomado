//todo de express
import express from 'express';

const app = express();
// Importar rutas
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';
import tasksRoutes from './routes/tasks.routes.js';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import { authenticateToken } from './middlewares/authenticate.js';

//middleware
app.use(morgan('dev')); // Para registrar las solicitudes HTTP en la consola
app.use(express.json());// Para parsear el cuerpo de las solicitudes JSON

// Routes
app.use('/api/login', authRoutes)
app.use('/api/users', usersRoutes);
app.use('/api/tasks',authenticateToken , tasksRoutes);
app.use(notFound);
app.use(errorHandler);
export default app;
// Configuración del servidor   
