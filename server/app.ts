import express, {
  Request,
  Response,
  Application,
  // NextFunction,
} from 'express';

// import IMilkStore from './interfaces/IMilkStore';
import milkStoreDB from './database';
import cors from "cors";

const app: Application = express();

app.use(cors()) 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app
  .route('/api/milkstore')
  .get((_req: Request, res: Response) => {
    res
      .setHeader('content-type', 'application/json')
      .status(200)
      .json(milkStoreDB);
  })


export default app;