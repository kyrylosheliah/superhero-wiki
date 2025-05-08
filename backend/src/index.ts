import express from 'express';
import cors from 'cors';
import { mapAllEndpoints } from './endpoints';

const app = express();

// Allow requests from frontend
app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

const router = app.router;

mapAllEndpoints(router);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
