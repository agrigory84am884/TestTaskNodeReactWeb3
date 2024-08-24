import 'reflect-metadata';
import express from 'express';
import cors from 'cors'; 
import { AppDataSource } from './config/AppDataSource'; // Ensure the path is correct
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controllers/UserController';
import { MainController } from './controllers/MainController';
import { AuthController } from './controllers/AuthController';
import { AuthGuard } from './middlewares/AuthGuard';
import { AddressController } from './controllers/AddressController';

const app = express();
const port = process.env.PORT_NODE || 3000;

const isDev = process.env.NODE_ENV === 'development';

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

if (isDev) {
  console.log('Running in development mode');
} else {
  console.log('Running in production mode');
}

app.use(cors({origin: '*'}));

AppDataSource.initialize().then(() => {
  console.log('Database connected successfully');

  useExpressServer(app, {
    controllers: [
      UserController, 
      MainController, 
      AuthController,
      AddressController
    ],
    middlewares: [AuthGuard], 
    validation: true,
    classTransformer: true,
  });

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

}).catch(error => {
  console.error('Error connecting to the database:', error);
});
