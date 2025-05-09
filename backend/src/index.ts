import express from 'express';
import cors from 'cors';
import { mapAllEndpoints } from './endpoints';

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

app.use(express.raw({ type: 'image/*', limit: '10mb' }));
app.use('../images', express.static('images'));

mapAllEndpoints(app);

const PORT = 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
