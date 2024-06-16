import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rotas
app.use('/api/usuarios', userRoutes);

// Inicialize o servidor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
