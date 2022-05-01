import * as express from 'express';
import * as cors from 'cors';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000;

app.get('/', (req: express.Request, res: express.Response) => {
  res.send({ title: 'test title', content: 'test content' });
});

app.on('error', (err) => {
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}...`);
});
